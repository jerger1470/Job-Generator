const fs = require("fs");
const path = require("path");
const util = require("util");


const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");


const templatesDir = path.resolve(__dirname, "../templates");

const outputDir = path.resolve(__dirname, "../output/");


const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);



async function render(employees) {
  const html = [];

  const [
    managerTemplate,
    internTemplate,
    engineerTemplate,
    employeeTemplate
  ] = await Promise.all([
    readFile(path.resolve(templatesDir, "manager.html"), "utf8"),
    readFile(path.resolve(templatesDir, "intern.html"), "utf8"),
    readFile(path.resolve(templatesDir, "engineer.html"), "utf8"),
    readFile(path.resolve(templatesDir, "employee.html"), "utf8")
  ]);


  html.push(
    employees
      .filter(employee => employee instanceof Manager)
      .map(employee => {
        let template = managerTemplate;
        for (const key in employee) {
          template = replacePlaceholder(template, key, employee[key]);
        }
        return template;
      })
      .join("")
  );


  html.push(
    employees
      .filter(employee => employee instanceof Engineer)
      .map(employee => {
        let template = engineerTemplate;
        for (const key in employee) {
          template = replacePlaceholder(template, key, employee[key]);
        }
        return template;
      })
      .join("")
  );


  html.push(
    employees
      .filter(employee => employee instanceof Intern)
      .map(employee => {
        let template = internTemplate;
        for (const key in employee) {
          template = replacePlaceholder(template, key, employee[key]);
        }
        return template;
      })
      .join("")
  );


  if (!fs.existsSync(outputDir)) { 
    fs.mkdirSync(outputDir);
  }
  await writeFile(
    path.resolve(outputDir, "index.html"),
    replacePlaceholder(employeeTemplate, "body", html.join(""))
  );
}
function replacePlaceholder(template, target, value) {
  const regex = new RegExp("{{ " + target + " }}", "gm");
  const newTemplate = template.replace(regex, value);
  return newTemplate;
}

module.exports = render;