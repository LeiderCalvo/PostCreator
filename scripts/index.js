const ig_post_sizes = [
    {name: 'common post', w: 1080, h: 1080, ratio: '1:1'},
    {name: 'film post', w: 1080, h: 608, ratio: '19:1'},
    {name: 'large post', w: 1080, h: 1350, ratio: '4:5'},
    {name: 'storie', w: 1080, h: 1920, ratio: '9:16'},
    {name: 'ig_tv', w: 420*2, h: 654*2, ratio: '1:1.5'}
];

const imgs_gallery_urls = ['Crisantemo.jpg', 'Desert.jpg', 'Faro.jpg', 'Fish.jpg',  'Flower.jpg', 'Koala.jpg',  'Penguins.jpg', 'Tulips.jpg'];

var canvas = new fabric.Canvas('canvas');
var activeObject;

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

function setActiveObject(){
    activeObject = canvas.getActiveObject();
}

function changeProp (prop, val) {
    if(activeObject === undefined) return;
    let obj = {};
    obj[prop] = val;
    activeObject.set(obj)
    canvas.renderAll()
}

//LISTENERS
canvas.on('selection:created', setActiveObject);
canvas.on('selection:updated', setActiveObject);
canvas.on('selection:cleared', e => activeObject = undefined );

select_post_size.addEventListener('change', e => {
    var arr_ps = ig_post_sizes.filter(ps => ps.name === e.target.value);
    canvas.setWidth( arr_ps[0].w/3 );
    canvas.setHeight( arr_ps[0].h/3 );
    canvas.calcOffset();
});

btn_addtext.onclick = e => {
    canvas.add( new fabric.Textbox( inpt_addtext.value, { left: 20, top: 20, fill: 'black'} ) );
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
    inpt_fileloader_msj.innerText = 'Cargando...';
    //let id = Math.random().toString(36).substr(2, 9), acceptedFiles[0].name;
    
    reader.onload = e => {
        inpt_fileloader_msj.innerText = 'sube tu archivo';
        addImgToGallery(e.target.result);
        inpt_fileloader.value = '';
    }
    reader.readAsDataURL(acceptedFiles[0]);
}

document.querySelectorAll('.btn_add').forEach( btn =>
    btn.onclick = e => {
        canvas.add( new fabric[btn.dataset.figure]({
            left: 90,
            top: 90,
            fill: 'red',
            width: 50,
            height: 50,
            radius: 25
        }) )
    }
)

//editing props

//document.querySelectorAll('.inpt_change').forEach( inp)

inp_opacity.onchange = e => changeProp(e.target.dataset.prop, e.target.value);
inp_color.onchange = e => changeProp(e.target.dataset.prop, e.target.value);
inp_font_family.onchange = e => changeProp(e.target.dataset.prop, e.target.value);
inp_font_size.onchange = e => changeProp(e.target.dataset.prop, e.target.value);

btn_left.onclick = e => changeProp(e.target.dataset.prop, 'left');
btn_center.onclick = e => changeProp(e.target.dataset.prop, 'center');
btn_rigth.onclick = e => changeProp(e.target.dataset.prop, 'right');
btn_justify.onclick = e => changeProp(e.target.dataset.prop, 'justify');

btn_underline.onclick = e => changeProp(e.target.dataset.prop, true);
btn_bold.onclick = e => changeProp(e.target.dataset.prop, 'bold');

inp_lineHeight.onchange = e => changeProp(e.target.dataset.prop, e.target.value);
inp_kerning.onchange = e => changeProp(e.target.dataset.prop, e.target.value);

//////////// Testing 

/*img.animate('left', '+=90', {
    onChange: canvas.renderAll.bind(canvas),
    duration: 500,
    easing: fabric.util.ease.easeOutBounce
})

btn_right.onclick = e => {
    /*console.log(rect.left)
    rect.left += 9;
    canvas.renderAll();
    
    canvas.get(0).toBlob(blob => {
        
    })
}
*/