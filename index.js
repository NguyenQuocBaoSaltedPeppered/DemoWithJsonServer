const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const db = require("./db.json");
const middlewares = jsonServer.defaults();
const { fakerVI: faker } = require("@faker-js/faker");
const unidecode = require("unidecode");
const queryString = require("querystring");
// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get("/suppliers/search", (req, res) => {
  const removeSpaces = (str) => {
    return str.replace(/\s/g, "");
  };
  // console.log(req.query);
  const { _page, _limit, _keyword, _status, _address } = req.query;
  const status = _status === "" ? _status : _status === "true";
  // console.log(db.suppliers.length);
  const data = [...db.suppliers];
  const page = Number.parseInt(_page);
  const limit = Number.parseInt(_limit);
  console.log(_page, _limit, _keyword, status, _address);
  const returnedData = data.filter((item) => {
    const maNCCMatch = unidecode(
      removeSpaces(item.maNCC.toLowerCase())
    ).includes(unidecode(removeSpaces(_keyword.toLowerCase())));
    const tenNCCMatch = unidecode(
      removeSpaces(item.tenNCC.toLowerCase())
    ).includes(unidecode(removeSpaces(_keyword.toLowerCase())));
    const emailMatch = removeSpaces(item.email.toLowerCase()).includes(
      removeSpaces(_keyword.toLowerCase())
    );
    const statusMatch = status === "" || item.status === status;
    const addressMatch = _address === "" || item.address.city === _address;
    return (
      (maNCCMatch || tenNCCMatch || emailMatch) && statusMatch && addressMatch
    );
  });

  const totalCount = returnedData.length;
  const startIndex = (page - 1) * limit;

  const endIndex = limit + startIndex - 1;

  const newResult = returnedData.slice(startIndex, endIndex + 1);

  const response = {
    data: newResult,
    totalCount: totalCount,
  };
  res.jsonp(response);
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
    req.body.maNCC = `NC${faker.number.int({ min: 10000, max: 99999 })}`;
  }
  // Continue to JSON Server router
  next();
});

router.render = (req, res) => {
  const queries = queryString.parse(req._parsedUrl.query);

  const headers = res.getHeaders();
  const totalCountHeader = headers["x-total-count"];
  if (req.method === "GET" && totalCountHeader) {
    const response = {
      data: res.locals.data,
      paginate: {
        _page: Number.parseInt(queries._page),
        _limit: Number.parseInt(queries._limit),
      },
      totalElems: totalCountHeader,
    };
    return res.jsonp(response);
  }
  res.jsonp(res.locals.data);
};

// Use default router
server.use(router);
server.listen(4096, () => {
  console.log("JSON Server is running");
});
