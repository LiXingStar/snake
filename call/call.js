window.addEventListener('load',function(){
    let dl = document.querySelector('dl');
    let search = document.querySelector('header> input')
    let aside = document.querySelector('.aside');
    let tips = document.querySelector('.tips');
    let info = [
        {name:'张俊英',tell:'15735104618',py:'zhangjunying'},
        {name:'郭少妮',tell:'15735104485',py:'guoshaoni'},
        {name:'刘志伟',tell:'15735104486',py:'liuzhiwei'},
        {name:'刘帅',tell:'15735104487',py:'liushuai'},
        {name:'陈保铭',tell:'15735104488',py:'chengbaoming'},
        {name:'赵路',tell:'15735104489',py:'zhaolu'},
        {name:'李泽路',tell:'15735104490',py:'lizelu'},
        {name:'冯聪',tell:'15735104491',py:'fengcong'},
        {name:'彭宇',tell:'15735104492',py:'pengyu'},
        {name:'赵爽',tell:'15735104493',py:'zhaoshuang'}
    ]

    search.onkeyup = function() {
        let value = this.value.trim();
        let data = info.filter(function (element) {
            return element.py.includes(value) || element.name.includes(value) || element.tell.includes(value)
        })
        render(data);
    }
    render(info);
    let dts = document.querySelectorAll('dt');
    let arr = [];
    let heights = document.querySelector('header').offsetHeight + tips.offsetHeight;
    dts.forEach(element=> arr.push(element.offsetTop));

    window.onscroll = function(){
        let st = document.documentElement.scrollTop ||document.body.scrollTop;
        arr.forEach((element,index)=>{
            if(st + heights >= element){
                tips.innerText = dts[index].innerText;
            }
        })
    }
   /*
   *   scrollTop + height >= offsetTop
   * */

    function render(data){
            dl.innerHTML = '';
            aside.innerHTML = '';
            let obj = {};
            data.forEach(function(element){
                let first = element.py.charAt(0).toUpperCase();
                if(!obj[first]){
                    obj[first] = [];
                }
                obj[first].push(element);
            })
            let char = Object.keys(obj).sort();
            tips.innerText = char[0];
            char.forEach(element=>{
                dl.innerHTML += `<dt>${element}</dt>`;
                aside.innerHTML +=`<li>${element}</li>`
                obj[element].forEach(value=>{
                    dl.innerHTML +=`
                <dd><a href="tel:${value.tell}">${value.name}</a></dd>
              `
                })
            })

            aside.style.marginTop = `${-aside.offsetHeight/2}px`;

        }
})