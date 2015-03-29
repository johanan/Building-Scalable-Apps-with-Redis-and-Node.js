 module.exports = function Request(){
  return {
    logoutCalled: false,
    flashCalled: false,
    body: {},
    session: {isAuthenticated: false,passport: {}},
    logout: function(){this.logoutCalled = true},
    flash: function(f, m){
      this.flashName = f;
      this.flashMessage = m;
      this.flashCalled = true;
      return f;
    },
    csrfToken: function(){return 'csrf';}
  };
}
