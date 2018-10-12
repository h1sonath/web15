function getRandomQuest(){
    $.ajax({
      url: 'http://localhost:3003/randomquestion',
      type: "GET",
      success: function(response){
        if(response){
          $("#questionContent").text(response.questionContent);
          $(".answer-btn").data("questionid", response.id);
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
    console.log($(this).data());
    $.ajax({
      url: 'http://localhost:3003/answer',
      type: 'POST',
      data: $(this).data(),
      success: function(response){
        if(response){
          window.location.href = "/vote";
        }
      },
      error: function(err){
        console.log(err);
      }
    })
  });
  
  $('#voteResult').on("click", function(){
    $.ajax({
      url: 'http://localhost:3003/vote',
      type: 'GET',
      success: function(response){
        if(response){
          window.location.href = "/vote";
        }
      },
      error: function(err){
        console.log(err);
      }
    })
  });
  