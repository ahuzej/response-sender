$(function() {
    bindButtons()
})

let newParam = () => {
    $.get('/newParam', (data) => {
        $('#param-list').append(data).end()
        bindButtons()
    }, 'html')
}

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
    // let paramsDiv = $('#param-list')
    // let parameters = []
    // paramsDiv.children('div').each(function(idx) {
    //     let parameter = {}       
    //     $(this).find('input[type=text]').each(function(idx2) {
    //         if(idx2 === 0) {
    //             parameter.key = this.value;
    //         } else {
    //             parameter.value = this.value; 
    //             parameters.push(parameter)
    //         }
    //     })
    // })

    $.ajax({
        type: 'POST',
        url: '/saveParams',
        data: JSON.stringify(parameters),
        contentType: "application/json; charset=utf-8",
        success: (data) => {
            console.log(data)
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

let removeParam = () => {
    
}


let sendRequest = () => {
    
    let parameters = getParams()
    $.get('/getRequestUrl', (url) => {
        $.ajax({
            type:'GET',
            url: url,
            data: parameters,
            dataType: 'json',
            success: (data, status, xhr) => {
                console.log('dabs')
                $('#responseCode').text(xhr.status)
                $('#requestUrl').text(data.url)
                $('#responseMessage').text(JSON.stringify(data))
                $('#response-content').css('visibility', 'visible')
            }
        })
    })
}