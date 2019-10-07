function getcomments(){
    let blogs=$('.comments')
    let str=[]
    $.ajax({
        url: '/getcomments',
        type: 'get',
        success: (data) => {
            for(let i=0;i<data.length;i++) {
                if(data[i].blogTitle == blogs[0].id) {
                    str=str + `<li><b> ${data[i].by}:</b> ${data[i].comment}  <button class="clike btn-sm btn-light border" id="${data[i].comment}">${data[i].likes} Upvote</button></li>`
                }
                blogs[0].innerHTML=str
            }
            str=[]
        }
    })
}

getcomments()

$("#commentform").submit(function(event){
	event.preventDefault(); //prevent default action 
	var post_url = $(this).attr("action"); //get form action url
	var form_data = $(this).serialize(); //Encode form elements for submission
	
	$.post( post_url, form_data, function( response ) {
      getcomments();
      $('#commentContent').val('')
	});
});


$('ul').click((e) => {
    let title=e.target.id
    $.ajax({
        url: '/like/' + title,
        type: 'post',
        success: () => {
            window.location.reload()
            console.log('ok');
            
        }
    })
})

$('#like').click((e) => {
    let title=e.target.parentElement.innerText
    title=title.slice(0, title.length-2)
    console.log(title);
    
    $.ajax({
        url: '/addlike/' + title,
        type: 'post',
        success: () => {
            window.location.reload()
        }
    })
})

$('#search').keyup((e) => {
    $.ajax({
        url: `/search?q=${e.target.value}`,
        type: 'get',
        success: (data) => {
            $('#sugg').html('')
            for(let i=0;i<data.length;i++){
                $('#sugg').append(`<p><a href="/blog?title=${data[i].title}">${data[i].title}</a></p>`)
            }
        }
    })
})