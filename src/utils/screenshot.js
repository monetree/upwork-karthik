import html2canvas from 'html2canvas';
export function handleScreenCapture(id, fileName = 'default',isPdf = false,resolve) {
    applyShadow(false);
    scrollTo(0,function(){
        html2canvas(document.getElementById(id),{scale:1})
        .then(canvas => {
            applyShadow(true)
            downloadFile(canvas, fileName,isPdf,id);
        });
    })
    
}



function downloadFile(canvas, fileName,isPdf = false,id) {
    const data = canvas.toDataURL('image/png');
        const link = document.createElement("a");
        link.style.display = "none";
        document.body.appendChild(link);
    
        link.href = data;
        link.download = fileName;
        link.click();
        document.body.removeChild(link)
        window.location = "/info"
}


function scrollTo(offset, callback) {
    const onScroll = function () {
        const scrollTop = window.scrollTop || window.pageYOffset

        if (scrollTop === offset) {
            window.removeEventListener('scroll', onScroll)
            callback()
        }
    }
    window.addEventListener('scroll', onScroll)
    onScroll()
    window.scrollTo({
        top: offset,
        behavior: 'smooth'
    })
}

function applyShadow(status) {
    let root = document.documentElement;
    if(!status){
        root.style.setProperty('--my-form-control-shadow','none');
        root.style.setProperty('--my-box-shadow','none');
        root.style.setProperty('--my-sumary-table-bottom-border','none');
    }else{
        root.style.setProperty('--my-form-control-shadow','1px 1px 8px -3px rgba(6, 6, 6, 0.15)');
        root.style.setProperty('--my-box-shadow','4px 4px 30px 1px #e0dfe2')
        root.style.setProperty('--my-sumary-table-bottom-border','0px 4px 0px -3px white');
    }
}