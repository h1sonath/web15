function getRandomQuest(){
    $.ajax({
      url: 'http://localhost:3003/randomquestion',
      type: "GET",
      success: function(response){
        if(response){
          $("#questionContent").text(response.questionContent);
          $(".answer-btn").data("questionid", response._id);
          $('#viewDetail').attr('href', '/question/' + response._id);
          console.log(response);
        }
      },
      error: function(err){
        console.log(err);
      }
    })
  }
  getRandomQuest();
  $('#otherQuestion').on("click", function(){getRandomQuest()});
  
  $('.answer-btn').on("click", function(){
    let questionId = $(this).data('questionid');
    console.log($(this).data());
    $.ajax({
      url: 'http://localhost:3003/answer',
      type: 'POST',
      data: $(this).data(),
      success: function(response){
        console.log(response)
        if(response){
          console.log(response)
          window.location.href = "/question/" + questionId;
        }
      },
      error: function(err){
        console.log(err);
      }
    })
  });
  
  // $('#voteResult').on("click", function(){
  //   $.ajax({
  //     url: 'http://localhost:3003/vote',
  //     type: 'GET',
  //     success: function(response){
  //       if(response){
  //         window.location.href = "/vote";
  //       }
  //     },
  //     error: function(err){
  //       console.log(err);
  //     }
  //   })
  // });
  