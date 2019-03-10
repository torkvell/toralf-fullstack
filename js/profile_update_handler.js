﻿function profile_update_handler(buttonElement) {
    var buttonClickedId = buttonElement.id;
    if (buttonClickedId === 'profile_update_btn') {

        //We clear the content for user output
        $("#ajax_feedback").html("");

        // Variable to hold request
        var request;

        // Unbind to the submit event of our form to prevent multiple js calls to submit event
        $("#profile_form").unbind('submit');
        // Bind to the submit event of our form
        $("#profile_form").submit(function (event) {

            // Prevent default posting of form - put here to work in case of errors
            event.preventDefault();

            // Abort any pending request
            if (request) {
                request.abort();
            }
            // setup some local variables
            var $form = $(this);

            // Let's select and cache all the fields
            var $inputs = $form.find("input, select, button, textarea");

            // Serialize the data in the form
            var serializedData = $form.serialize();

            // Let's disable the inputs for the duration of the Ajax request.
            // Note: we disable elements AFTER the form data has been serialized.
            // Disabled form elements will not be serialized.
            $inputs.prop("disabled", true);

            // Fire off the request to /update_profile.php
            request = $.ajax({
                url: "update_profile.php",
                type: "post",
                data: serializedData,
                success: function (response) {
                    if (response == "success") {
                        // If update attempt is success:
                        $("#ajax_feedback").append("<h4 style='color:green;'>Profile updated successfully!</h4>");
                    } else {
                        // User output
                        $("#ajax_feedback").append("<h4 style='color:red;'> Something went wrong! " + response + "</h4>");
                    }
                }
            });

            // Callback handler that will be called regardless
            // if the request failed or succeeded
            request.always(function () {
                // Reenable the inputs
                $inputs.prop("disabled", false);                
            });

        });
    }
}