    // Fetch all cards from the server and display them
    const getAllCards = () => {
        $.ajax({
            url: '/api/cards',
            method: 'GET',
            success: function(response) {
                if (response.statusCode === 200) {
                    addCards(response.data);
                } else {
                    console.error("Error fetching cards:", response.error);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("Error fetching cards:", errorThrown);
            }
        });
    };

// Add a new card to the server
const submitForm = () => {
    let formData = {
        title: $('#title').val(),
        image: $('#image').val(),
        link: $('#link').val(),
        description: $('#description').val()
    };

    console.log("Submitting form..."); // Added console log for debugging

    $.ajax({
        url: '/api/cards',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function(response) {
            console.log("Form submission successful:", response); // Added console log for debugging
            if (response.statusCode === 201) {
                getAllCards(); // Refresh cards after adding a new one
                // Show alert
                alert("Card posted");
            } else {
                console.error("Error adding card:", response.error);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error("Error adding card:", errorThrown);
        }
    });
};



    // Delete a card from the server
    const deleteCard = (cardId) => {
        $.ajax({
            url: `/api/cards/${cardId}`,
            method: 'DELETE',
            success: function(response) {
                if (response.statusCode === 200) {
                    getAllCards(); // Refresh cards after deleting one
                } else {
                    console.error("Error deleting card:", response.error);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("Error deleting card:", errorThrown);
            }
        });
    };

    // Function to display cards on the webpage
    const addCards = (cards) => {
        $('#card-section').empty();
        cards.forEach(card => {
            let cardHtml = `
                <div class="col s4 center-align">
                    <div class="card medium">
                        <div class="card-image waves-effect waves-block waves-light">
                            <img class="activator" src="${card.image}">
                        </div>
                        <div class="card-content">
                            <span class="card-title activator grey-text text-darken-4">${card.title}<i class="material-icons right">more</i></span>
                            <p><a href="${card.link}">${card.link}</a></p>
                        </div>
                        <div class="card-reveal">
                            <span class="card-title grey-text text-darken-4">${card.title}<i class="material-icons right">close</i></span>
                            <p class="card-text">${card.description}</p>
                            <button class="delete-card btn-small red" data-id="${card._id}">Delete</button>
                        </div>
                    </div>
                </div>`;
            $('#card-section').append(cardHtml);
        });

        // Add event listener for delete button
        $('.delete-card').click(function() {
            let cardId = $(this).data('id');
            deleteCard(cardId);
        });
    };

    $(document).ready(function(){
        // Initialize modal
        $('.modal').modal();

        // Fetch and display all cards when the page loads
        getAllCards();

        // Show modal on "Click Me" button click
        $('#clickMeButton').click(function() {
            $('#modal1').modal('open');
        });

        // Handle form submission
        $('#formSubmit').click(function() {
            submitForm();
        });

    // // Socket.io setup
    // let socket = io();

    // // Listen for 'number' event from server
    // socket.on('number', (data) => {
    //     console.log('Received number:', data);
    //     // Handle the received number here
    // });
    });
