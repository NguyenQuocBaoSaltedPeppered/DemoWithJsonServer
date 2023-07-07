const { fakerVI: faker } = require("@faker-js/faker");
const fs = require("fs");
// console.log(faker.company.name());
const cities = [
  "Hà Nội",
  "TP Hồ Chí Minh",
  "Đà Nẵng",
  "Hải Phòng",
  "Cần Thơ",
  "An Giang",
  "Bà Rịa-Vũng Tàu",
  "Bạc Liêu",
  "Bắc Kạn",
  "Bắc Giang",
  "Bắc Ninh",
  "Bến Tre",
  "Bình Dương",
  "Bình Định",
  "Bình Phước",
  "Bình Thuận",
  "Cà Mau",
  "Cao Bằng",
  "Đắk Lắk",
  "Đắk Nông",
  "Điện Biên",
  "Đồng Nai",
  "Đồng Tháp",
  "Gia Lai",
  "Hà Giang",
  "Hà Nam",
  "Hà Tĩnh",
  "Hải Dương",
  "Hậu Giang",
  "Hòa Bình",
  "Hưng Yên",
  "Khánh Hòa",
  "Kiên Giang",
  "Kon Tum",
  "Lai Châu",
  "Lâm Đồng",
  "Lạng Sơn",
  "Lào Cai",
  "Long An",
  "Nam Định",
  "Nghệ An",
  "Ninh Bình",
  "Ninh Thuận",
  "Phú Thọ",
  "Quảng Bình",
  "Quảng Nam",
  "Quảng Ngãi",
  "Quảng Ninh",
  "Quảng Trị",
  "Sóc Trăng",
  "Sơn La",
  "Tây Ninh",
  "Thái Bình",
  "Thái Nguyên",
  "Thanh Hóa",
  "Thừa Thiên-Huế",
  "Tiền Giang",
  "Trà Vinh",
  "Tuyên Quang",
  "Vĩnh Long",
  "Vĩnh Phúc",
  "Yên Bái",
];
const districts = ["Quận 1", "Quận 2", "Quận 3", "Quận 4", "Quận 5"];
const wards = ["Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5"];

const categories = ["Ngành may mặc", "Ngành thời trang"];

const randomElement = (Array) => {
  return Array[Math.floor(Math.random() * Array.length)];
};
const suppliers = [];
id = 1;
for (let i = 0; i < 70; i++) {
  const supplier = {
    id: id + i,
    maNCC: `NC0000${i + 1}`,
    tenNCC: `Nhà cung cấp ${i + 1}`,
    danhMuc: categories[Math.floor(Math.random() * categories.length)],
    code: `32${i + 1}`,
    congno: `111112021`,
    phone: faker.phone.number("09#########"),
    email: faker.internet.email({ provider: "gmail.com" }),
    address: {
      city: randomElement(cities),
      district: randomElement(districts),
      ward: randomElement(wards),
      specific: `7${i + 1} Núi Thành`,
    },
    status: i % 2 === 0,
  };
  suppliers.push(supplier);
}
(() => {
  const db = {
    cities: [...cities],
    districts: [...districts],
    wards: [...wards],
    categories: [...categories],
    suppliers: [...suppliers],
  };

  fs.writeFile("db.json", JSON.stringify(db), () => {
    console.log("write success");
  });
})();
