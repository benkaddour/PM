jQuery(document).ready(function($) {
  "use strict";

  //newsletter
  $('#newsletter_submit').click(function(){
    var email = $('#email').val();
    if (/^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/.test(email)) {
      $.ajax({
        type: "POST",
        url: "contactform/newsletter.php",
        data:  "email=" + email,
        success: function(msg) {
          if (msg == true){
            $("#sendnewsletter").addClass("show");
            $("#samenewsletter").removeClass("show");
            $("#errornewsletter").removeClass("show");
          }
          else if (msg == false)  {
            $("#samenewsletter").addClass("show");
            $("#errornewsletter").removeClass("show");
            $("#sendnewsletter").removeClass("show");
          }
          else {
            $("#errornewsletter").addClass("show");
            $("#samenewsletter").removeClass("show");
            $("#sendnewsletter").removeClass("show");
            $("#errornewsletter").html(msg);
          }
        }
      });
      return false;
    } else {
        $("#errornewsletter").addClass("show");
        $("#samenewsletter").removeClass("show");
        $("#sendnewsletter").removeClass("show");
        $("#errornewsletter").html("Votre adresse e-mail '" + email + "' est invalide.");
        return false;
    }
  });

  //Contact
  $('form.contactForm').submit(function() {
    var f = $(this).find('.form-group'),
      ferror = false,
      emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    f.children('input').each(function() { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;

          case 'email':
            if (!emailExp.test(i.val())) {
              ferror = ierror = true;
            }
            break;

          case 'checked':
            if (! i.is(':checked')) {
              ferror = ierror = true;
            }
            break;

          case 'regexp':
            exp = new RegExp(exp);
            if (!exp.test(i.val())) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    f.children('textarea').each(function() { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    if (ferror) return false;
    else var str = $(this).serialize();

    $.ajax({
      type: "POST",
      url: "contactform/contactform.php",
      data: str,
      success: function(msg) {
        //alert(msg);
        if (msg == true) {
          $("#sendmessage").addClass("show");
          $("#errormessage").removeClass("show");
          $('.contactForm').find("input, textarea").val("");
        } else {
          $("#sendmessage").removeClass("show");
          $("#errormessage").addClass("show");
          $('#errormessage').html(msg);
        }

      }
    });
    return false;
  });

});
