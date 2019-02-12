/*
$(function () {
    $.get('https://api.github.com/users/the-zeng/repos').then(function (repos) {
    });
  });
*/

/*
$(function() {
    $("#github-author").loadRepositories("the-zeng");
});
*/

$(function() {
    $("#github-author").loadCommits("dinic");
});


jQuery.githubUser = function(username, callback) {
    jQuery.getJSON('https://api.github.com/users/'+username+'/repos?callback=?',callback)
 } // what does callback=? mean


 jQuery.fn.loadRepositories = function(username) {
     
     this.html("<span>Querying GitHub for " + username +"'s repositories...</span>");
      
     var target = this;
     $.githubUser(username, function(data) {
         var repos = data.data; // JSON Parsing
         sortByName(repos);    
      
         var list = $('<dl/>');
         target.empty().append(list);
         $(repos).each(function() {
             if (this.name != (username.toLowerCase()+'.github.com')) {
                 list.append('<dt><a href="'+ (this.homepage?this.homepage:this.html_url) +'">' + this.name + '</a> <em>'+(this.language?('('+this.language+')'):'')+'</em></dt>');
                 list.append('<dd>' + this.description +'</dd>');
             }
         });      
       });
       
     function sortByName(repos) {
         repos.sort(function(a,b) {
         return a.name - b.name;
        });
     }
 };

 //original 
jQuery.githubFile = function(filename, callback) {
    jQuery.getJSON('https://api.github.com/users/the-zeng/blog/commits?callback=?',callback)
}

jQuery.fn.loadCommits = function(filename) {
     
    //what is inside "this"
    this.html("<span>Querying GitHub for " + filename +"'s repositories...</span>");
     
    var target = this;
    $.githubFile(filename, function(data) {
        var commits = data; // JSON Parsing what does this mean?
        return commits
        //sortByName(repos);    
     /*
        var list = $('<dl/>');
        target.empty().append(list);
        $(commits).each(function() {
            if (this.name != (username.toLowerCase()+'.github.com')) {
                list.append('<dt><a href="'+ (this.homepage?this.homepage:this.html_url) +'">' + this.name + '</a> <em>'+(this.language?('('+this.language+')'):'')+'</em></dt>');
                list.append('<dd>' + this.description +'</dd>');
            }
        });      
      });
      
    function sortByName(repos) {
        repos.sort(function(a,b) {
        return a.name - b.name;
        
       });
       */
    })
};
