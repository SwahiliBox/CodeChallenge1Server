describe("User", function(){
  // just any other user
  it("has a name and email")
  it("can log in")
  it("can register by providing username, email and password")
  it("can either be admin or normal user")

  // context for admin users
  describe("Admin User", function(){
    it("Can create other users")
    it("can delete and manager resources")
  })

  describe("Merge login & master ", function () {
    it("make sure App.js and Server.js are in one file which will be Server.js")
    it("add loging routes to master routes(app->models->routes.js)")
    it("add loging user to master(ap->models->user.js)")

  })
})
