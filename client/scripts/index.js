$(document).ready(() => {

    $('.support_circle').click(function () {
        $(this).css('display', 'none');
        $('.chat').css('display', 'grid');
    });

    $('.box_top__cancel').click(function () {
        $('.chat').css('display', 'none');
        $('.support_circle').css('display', 'block');
    });

    let ArrayMessages = [];

    $.ajax({
        method: 'GET',
        url: 'http://localhost:4000/getM',
        dataType: 'json',
        success: function (res) {
            ArrayMessages = res;
            displayMessages(ArrayMessages);
            console.log(ArrayMessages);
        },
        error: function (err) {
            console.log(err);
        }
    });

    function displayMessages(messages) {
        messages.forEach((el) => {
            let Image = el.file ? JSON.parse(el.file) : null;
            $('.box_messages').append(
                $('<div></div>').addClass('box_center__message').append(
                    $('<div></div>')
                        .addClass(el.admin === 'true' ? 'message__text_admin message__text' : 'message__text')
                        .addClass(Image && el.text !== '' ? 'message__text_img message__text' : '')
                        .text(el.text).append(Image ? `<img class="message__img" src="http://localhost:4000/${Image.destination}/${Image.filename}"/>` : null)
                )
            );
        });
    };

    $('#file').click(function () {
        $('.box_bottom__input_file').click();
    });

    $('.box_bottom__input_file').change(function () {
        this.files.length > 0 ? $('#file').css('filter', 'drop-shadow(1px 1px 0 #ff0000)') : $('#file').css('border', '');
    })

    function sendMessage() {
        let Data = new FormData();
        let ValueInputFile = $('.box_bottom__input_file')[0].files[0];
        let ValueInput = $('.box_bottom__input').val();
        if (ValueInputFile) {
            Data.append('file', ValueInputFile);
        };
        Data.append('admin', ValueInput.startsWith('***') ? true : false);
        Data.append('text', ValueInput.startsWith('***') ? ValueInput.slice(3) : ValueInput);
        console.log(Data);

        $.ajax({
            method: 'POST',
            url: 'http://localhost:4000/add',
            processData: false,
            contentType: false,
            data: Data,
        })
            .done(function (res) {
                console.log(res);
                $('.box_bottom__input').val('');
                $('.box_bottom__input_file').val('');
            })
            .fail(function (err) {
                console.log(err);
            })
    }

    $('#send').click(sendMessage);

    $('#send').keydown(function (e) {
        if (e.key === 'Enter') {
            sendMessage()
        }
    });

    $('.box_bottom__input').keydown(function (e) {
        if (e.key === 'Enter') {
            sendMessage()
        }
    });
});