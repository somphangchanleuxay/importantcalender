
$(document).ready(function() {
  setCurrentDate();

  generateTimeBlocks();
  applyTimeBlockStyles();

  loadUserInput();

  $(".btn.saveBtn").on("click", function() {
    var hourId = $(this).closest(".time-block").attr("id");
    var userInput = $(this).siblings(".description").val();
    localStorage.setItem(hourId, userInput);
  });
});

function setCurrentDate() {
  var currentDate = dayjs().format("dddd, MMMM D");
  
  $("#currentDay").text(currentDate);
}

function applyTimeBlockStyles() {
  var currentHour = dayjs().hour();

  $(".time-block").each(function() {
    var blockHour = parseInt($(this).attr("id").split("-")[1]);

    if (blockHour < currentHour) {
      $(this).addClass("past");
    } else if (blockHour === currentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });
}

function loadUserInput() {
  $(".time-block").each(function() {
    var hourId = $(this).attr("id");
    var savedData = localStorage.getItem(hourId);

    if (savedData !== null) {
      $(this).find(".description").val(savedData);
    }
  });
}

function generateTimeBlocks() {
  var timeBlockContainer = $(".container-lg");

  for (var hour = 0; hour < 24; hour++) {
    var formattedHour = dayjs().hour(hour).format("ha");
    var timeBlock = `
      <div id="hour-${hour}" class="row time-block">
        <div class="col-2 col-md-1 hour text-center py-3">${formattedHour}</div>
        <textarea class="col-8 col-md-10 description" rows="3"></textarea>
        <button class="btn saveBtn col-2 col-md-1" aria-label="save">
          <i class="fas fa-save" aria-hidden="true"></i>
        </button>
      </div>
    `;

    timeBlockContainer.append(timeBlock);
  }
}
  
  
  