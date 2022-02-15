const homepage = async (req, res) => {
  return res.render("homepage")
}

const aboutPage = async (req, res) => {
  return res.render("about")
}

const contactPage = async (req, res) => {
  return res.render("contact")
}

const loginPage = async (req, res) => {
  return res.render("login",{
    layout:'./authLayout'
  })
}

module.exports = {
  homepage,
  aboutPage,
  contactPage,
  loginPage
}