let url = 'https://source.unsplash.com/1280x720'
fetch(url)
    .then( (response) => {
        if(response.ok){
            console.log('ok');
        }else{
            console.log('other condition');
        }
    })
    .catch((error) => {
        console.log(`Error: ${error}`);
        console.log('Internet connection error');
    })