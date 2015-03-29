module.exports = function Response(){
  return {
    url: '',
    locals: {},
    redirect: function(redirectUrl){this.url = redirectUrl;},
    render: function(view, viewData){
      this.view = view;
      this.viewData = viewData;
    },
    redirect: function(url){this.url = url;}
  }
};
