
  const maxLength = 200;
     $('#questionContent1').on('input', function(){
        var remainChar = maxLength - $('#questionContent1').val().length;   
        $('#remain').text(remainChar);
     });