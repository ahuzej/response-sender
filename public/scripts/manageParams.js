$(function() {
    bindButtons()
})

let newParam = () => {
    $.get('/newParam', (data) => {
        $('#param-list').append(data).end()
        bindButtons()
    }, 'html')
}

//takes parameters from website input and returns them as array of objects
let getParams = () => {
    let paramsDiv = $('#param-list')
    let parameters = []
    paramsDiv.children('div').each(function(idx) {
        let parameter = {}       
        $(this).find('input[type=text]').each(function(idx2) {
            if(idx2 === 0) {
                parameter.key = this.value;
            } else {
                parameter.value = this.value; 
                parameters.push(parameter)
            }
        })
    })
    return parameters    
}

let saveParams = () => {
    let parameters = getParams()

    $.ajax({
        type: 'POST',
        url: '/saveParams',
        data: JSON.stringify(parameters),
        contentType: "application/json; charset=utf-8",
        success: (data) => {
            updateStatus(data)
        }
    })
}

let bindButtons = () => {
    $('#param-list .form-inline').find('button').each(function() {
        $(this).click(function() {
            target = $(this).parents(':eq(1)')
            target.fadeOut(500, function() { 
                target.remove();
            }
            );
        })
    })   
}

let updateStatus = (text) => {
    $('#status-message').fadeIn(200);
    $('#status-message span').text(text)

}

let detachParams = (params) => {
    let detached = {}
    params.forEach((val) => {
        detached[val.key] = val.value
    })
    return detached
}


let sendRequest = () => {
    
    let parameters = detachParams(getParams())

    $.get('/getRequestUrl', (url) => {
        $.ajax({
            type:'GET',
            url: url,
            data: parameters,
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            success: (data, status, xhr) => {
                updateStatus('Request has been completed successfully!')
                $('#responseCode').text(xhr.status)
                $('#requestUrl').text(data.url)
                $('#responseMessage').text(JSON.stringify(data))
                $('#response-content').css('visibility', 'visible')
            },
            error: (jqXHR) => {
                updateStatus('Request has failed!')
                alert('Send request failed! Error code ' + jqXHR)
            }
            
        })
    })
}