const ig_post_sizes = [
    {name: 'common post', w: 1080, h: 1080, ratio: '1:1'},
    {name: 'film post', w: 1080, h: 608, ratio: '19:1'},
    {name: 'large post', w: 1080, h: 1350, ratio: '4:5'},
    {name: 'storie', w: 1080, h: 1920, ratio: '9:16'},
    {name: 'ig_tv', w: 420*2, h: 654*2, ratio: '1:1.5'}
];

const imgs_gallery_urls = ['Crisantemo.jpg', 'Desert.jpg', 'Faro.jpg', 'Fish.jpg',  'Flower.jpg', 'Koala.jpg',  'Penguins.jpg', 'Tulips.jpg'];

var canvas = new fabric.Canvas('canvas');

(e => {
    ig_post_sizes.forEach( ps => {
        let opt = document.createElement('option');
        opt.innerText = ps.name;
        select_post_size.appendChild(opt);
    });

    canvas.setWidth( ig_post_sizes[0].w/3 );
    canvas.setHeight( ig_post_sizes[0].h/3 );
    canvas.calcOffset();

    imgs_gallery_urls.forEach( url => addImgToGallery('imgs/'+url) )

})()

function addImgToGallery(url) {
    let img = document.createElement('img');
    img.src = url;
    img.onclick = galleyImgOnClick;
    imgs_gallery.appendChild(img);
}

//LISTENERS
select_post_size.addEventListener('change', e => {
    var arr_ps = ig_post_sizes.filter(ps => ps.name === e.target.value);
    canvas.setWidth( arr_ps[0].w/3 );
    canvas.setHeight( arr_ps[0].h/3 );
    canvas.calcOffset();
});

btn_addtext.onclick = e => {
    canvas.add( new fabric.Text( inpt_addtext.value, { left: 20, top: 20, fill: 'black'} ) );
    inpt_addtext.value = '';
    canvas.renderAll(); 
}

function galleyImgOnClick() {
    fabric.Image.fromURL(this.src, img => {
        img.scaleToWidth(canvas.width, false);
        canvas.add(img);
    });
}

inpt_fileloader.onchange =  e => {
    let acceptedFiles = e.target.files;
    var reader = new FileReader();
    //let id = Math.random().toString(36).substr(2, 9), acceptedFiles[0].name;
    
    reader.onload = e => {
        /*let p = this.document.querySelector(`#${'p'+id}`);
        p.innerText = 'Cargado';
        p.classList.remove('loading');*/
        addImgToGallery(e.target.result)
    }
    reader.readAsDataURL(acceptedFiles[0]);
    
}

//////////// Testing 

var rect = new fabric.Rect({
    left: 90,
    top: 90,
    fill: 'red',
    width: 50,
    height: 50
});
canvas.add(rect);



/*img.animate('left', '+=90', {
    onChange: canvas.renderAll.bind(canvas),
    duration: 500,
    easing: fabric.util.ease.easeOutBounce
})*/

btn_right.onclick = e => {
    /*console.log(rect.left)
    rect.left += 9;
    canvas.renderAll();*/

    canvas.get(0).toBlob(blob => {
        
    })
}