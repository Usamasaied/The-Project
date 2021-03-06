var products = {
  'Books':[
    {
      'name':'Beautiful Ruins',
      'category':'Books',
      'price':24.99,
      'pic_url':' https://goo.gl/jTHWdy'
    },
    {
      'name':'catch-22',
      'category':'Books',
      'price':20,
      'pic_url':'https://goo.gl/9l5kff'


    },
    {
      'name':'lolita',
      'category':'Books',
      'price':22,
      'pic_url':'https://goo.gl/ZdJT12'

    }],
  'Albums':[
    {
      'name':'The Black Album',
      'category':'Albums',
      'price':19.99,
      'pic_url':'https://i.ytimg.com/vi/DqDeH3hwxfw/maxresdefault.jpg'
    },
    {
      'name':'25',
      'category':'Albums',
      'price':29.99,
      'pic_url':'https://goo.gl/Ks5c6y'

    },
    {
      'name':'Thriller',
      'category':'Albums',
      'price':24,
      'pic_url':'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1ihcYhpeLS0DP2xBq7K-eBeiTGcwHOPq-jDDYmLcHdPRSH-DIRg'

    }]

};
if (!JSON.parse(localStorage.getItem('all-products'))) {
  localStorage.setItem('all-products', JSON.stringify(products))
}

var stored = JSON.parse(localStorage.getItem('all-products'));
var mainFunctions = {
  'mainContent':function(inObject, awlMara){
    var content='';
    var s =0;

    for(var key in inObject){
      if (awlMara) {
        $('.dropdown-menu').append('<li><a href="#">'+key+'</a></li>');
        inObject[key].findIndex(function(a,b){
          a.id = key+b;
        });
      }
      for (var i = 0; i < inObject[key].length; i++) {
        if (s === 0 || s%3 === 0) {
          content += '<div class="row">'
        }

        content += this.add_to_page(inObject[key][i]);
        if ((s+1)%3 === 0) {
          content += '</div>'
        }
        s++
      }
    }
    $('.content').html(content);
    $('.dropdown-menu li').click(function(){
      var term = $(this).text();
      (term === 'See All')? mainFunctions.mainContent(stored):mainFunctions.filteration(term, 'category');
      mainFunctions.addToCart();
    });
  },
  'headerFooter':function(mm){
    var x = '<nav class="navbar navbar-default navbar-static-top">'+
          '<div class="container-fluid addUser">'+
            '<div class="navbar-header">'+
              '<a class="navbar-brand" href="#">'+
                '<img src="" alt="Brand Img" />'+
              '</a>'+
              '<a class="navbar-brand" href="#">Shop EL-7ub</a>'+

            '</div>'+

          '</div>'+
          '<div class="container-fluid searchNav">'+
            '<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1" >'+

              '<form class="navbar-form navbar-left">'+
                '<div class="form-group">'+
                  '<label for="search"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></label>'+

                  '<input id="search" type="text" class="form-control" placeholder="Search">'+
                '</div>'+
                '<button type="submit" id="go" class="btn btn-default">Go</button>'+
              '</form>'+

              '<ul class="nav navbar-nav">'+
                '<li class="dropdown">'+
                  '<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Category <span class="caret"></span></a>'+
                  '<ul class="dropdown-menu">'+
                  '<li><a href = "#">See All</a></li>'+
                  '</ul>'+
                '</li>'+
              '</ul>'+

              '<button type="button" class="btn btn-default btn-md navbar-right">'+
                '<span class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span>'+
                '<span class="badge" id="count"></span>'+
              '</button>'+

          '  </div>'+

          '</div>'+


        '</nav>'+



        '<div class="container-fluid content"></div>'+



        '<div class="footer">'+


          '<p id="copyrights">'+
              'Copyright&copy; 2016 Team Four. All rights reserved.'+
          '</p>'+


        '</div>';
    $('body').html(x);
    if (mm) {
      $('.addUser').append('<button type="button" class="btn btn-default navbar-btn navbar-right signBtn">Sign in</button>');
    };
    $('#go').click(function(){
      var term =document.getElementById('search').value;
      mainFunctions.filteration(term, 'name')
      mainFunctions.addToCart();
    });

  },
  'addToCart':function(){
    var m = document.querySelector('#count').textContent;

    $('.add').click(function(){
        if($(this).text()=== "Add to cart"){

          $('#count').text(++m);

          $(this).text("Remove from cart").removeClass('btn-primary');
        }
        else {
          $('#count').text(--m);

          $(this).text("Add to cart").addClass('btn-primary');
          if ($('#count').text() === "0") {
            $('#count').text("");

          }

        }
    });
  },
  'add_to_page':function(item){
    var  x = '<div  class="col-xs-12 col-sm-6    col-md-4">'+
          '<div  class="thumbnail product">'+
            '<img src='+item.pic_url+' alt="...">'+
            '<div class="caption">'+
              '<div class="name">'+
                '<h3>'+item.name+'</h3>'+
              '</div>'+
              '<div class="price">'+
                '<p>'+item.price+' EGP</p>'+
              '</div>'+
              '<button type="button" id='+item.id+'   class="btn btn-default btn-sm removeBtn hideBtn"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>'+
              '<p><button class="btn btn-primary add" type="button" data-toggle="button" aria-pressed="false" autocomplete="off">Add to cart</button><a href="#" class="btn btn-default" role="button">Details</a></p>'+
            '</div></div></div>';
    return x;
  },
  'signedAs':function(){
    var user = JSON.parse(localStorage.getItem('UserName'));
    $('.addUser').append('<p class="navbar-text navbar-right signedAs">Signed in as '+user+' </p>');
  },
  'addRemove':function(){
    var addModal = '<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">'+
      '<div class="modal-dialog" role="document">'+
        '<div class="modal-content">'+
          '<div class="modal-header">'+
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
            '<h4 class="modal-title" id="myModalLabel">New item</h4>'+
          '</div>'+
          '<div class="modal-body">'+
            '<div class="productImage">'+
              "<label for='proImage' >Product's Image</label>"+
              "<input type='text' placeholder='Image's URL' id='proImage' >"+
            '</div>'+
            '<div class="productName">'+
              "<label for='proName'>Product's Name</label>"+
              '<input type="text" id="proName" >'+

            '</div>'+
            '<div class="productPrice">'+
              "<label for='proPrice'>Product's Price</label>"+
              '<input type="text" id="proPrice" >'+
            '</div>'+
            '<div class="productCategory">'+
              "<label for='proCategory'>Product's Category</label>"+
              '<input type="text" id="proCategory" >'+
            '</div>'+


          '</div><div class="modal-footer">  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button><button type="button" class="btn btn-primary addItem">Add Item</button>  </div>  </div>  </div>  </div>'+
          '<button type="button" class="btn btn-default btn-lg btn-primary addBtn" data-toggle="modal" data-target="#myModal">  <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>    </button>';

    $('body').append(addModal);
    $('.removeBtn').removeClass('hideBtn');
    $('.removeBtn').click(function(){
      if (confirm('Are you sure?')) {
        var selected = $(this).attr('id');
        mainFunctions.filteration(selected, 'id', 'ah');
      }


    });

  },
  'filteration': function(term, searchCategory, mode){
    var res={};
    if (mode) {
      for(var key in stored){
        var fltr = _.filter(stored[key],function(index){
         return index[searchCategory] !== term;
          })
        if (fltr.length) {
        res[key] = fltr;
        }

      }
      localStorage.setItem('all-products', JSON.stringify(res));
      stored = JSON.parse(localStorage.getItem('all-products'));
      mainFunctions.mainContent(res);
      mainFunctions.addRemove();
    } else {
      for(var key in stored){
        var fltr = _.filter(stored[key],function(index){
         return index[searchCategory] === term;
          })
         res[key] = fltr;
      }
      mainFunctions.mainContent(res);
    }
    // mainFunctions.addToCart();
  },
  'signInPage':function(){
    var x = '<form class="col-xs-offset-4 col-xs-4" action=""  method="GET" ><div class="form-group"><label for="exampleInputEmail1">Username</label><input type="text" class="form-control" id="exampleInputEmail1" placeholder="username"></div><div class="form-group"><label for="exampleInputPassword1">Password</label>'+
        '<input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"></div><button type="submit" class="btn btn-default btn-primary signIn">Sign in</button></form>';
    $('.searchNav').hide();
    $('.content').html(x);

  }
};

mainFunctions.headerFooter('ah');
mainFunctions.mainContent(stored, 'ah');
mainFunctions.addToCart();
$('.signBtn').click(function(){
  mainFunctions.signInPage();
  $('.signIn').click(function(event){
    event.preventDefault();
    var username = document.getElementById('exampleInputEmail1').value;
    var password = document.getElementById('exampleInputPassword1').value;
    localStorage.setItem('UserName',JSON.stringify(username));
    mainFunctions.headerFooter();
    mainFunctions.mainContent(stored, 'ah');
    mainFunctions.addToCart();
    mainFunctions.signedAs();
    if (username === 'usa' && password === '777') {
      mainFunctions.addRemove();
    }
    $('.addItem').click(function(){

      var image = document.getElementById('proImage').value;
      var name = document.getElementById('proName').value;
      var price = document.getElementById('proPrice').value;
      var category = document.getElementById('proCategory').value;
      var items = JSON.parse(localStorage.getItem('all-products')) || {};
      items[category] = items[category] || [];
      items[category].unshift({'category': category,'name': name, 'pic_url':image,'price':parseInt(price)});
      localStorage.setItem('all-products', JSON.stringify(items));

      console.log(JSON.parse(localStorage.getItem('all-products')));

    })
    // $('.removeBtn').click(function(){
    //   var selected = $(this).attr('id');
    //   mainFunctions.filteration(selected, 'id', 'ah');
    //
    // });
  })
});
