
const $=document.querySelector.bind(document);
const $$=document.querySelectorAll.bind(document);
 //get element is cd image
 const cd_img=$('.player__cd');
 const nameSong =$('.player__header-name');
 const singerSong=$('.player__header-singer');
 const wrapper=$('.wrapper');
 var audio = $('#audio');



 // get elemnt controls
 const btnPlay=$('.btn-play');
 const btnPause=$('.btn-pause');
 const btnRandom=$('.btn-random');
 const btnRepeat=$('.btn-repeat');

 const btnPrev=$('.btn-prev');

 const btnNext=$('.btn-next');

const range =$('.controls__range-item');

const timeStart =$('.time__begin');
const timeEnd =$('.time__end');


// xö lý scroll
const app={
    // declare varible 
    currentIndex : 0,
    isPlaying : false,
    isRandom:false,
    isRepeat:false,
    // infrastructure
    songs : [
        {
            name:"Ác Ma Đến Từ Thiên Đường",
            singer:"Đặng Tử Kỳ",
            image:'Image/acmadentuthienduong_dangtuky.jpg',
            audio:"Audio/acMaDenTuThienDuong.mp3"
        },
        {
            name:"LeyLa",
            singer:"Mesto",
            image:"Image/leyla_mesto.jpg",
            audio:"Audio/leyLa.mp3"
        },
        {
            name:"Play Date",
            singer:"Melanie Martinez",
            image:"Image/MelanieMartinez _Play Date.jpg",
            audio:"Audio/playDate.mp3"
        },
        {
            name:"Snow Man",
            singer:"Sia",
            image:"Image/snowman_sia.jpg",
            audio:"Audio/snowMan.mp3"
        },
        {
            name:"Super Idol",
            singer:"Không Rõ",
            image:"Image/superIdol.jpg",
            audio:"Audio/superIdol_105doC.mp3"
        },
        {
            name:"Thời Không Sai Lệch",
            singer:"Không Nhớ",
            image:"Image/thoikhongsailech.jpg",
            audio:"Audio/thoiKhongSaiLech.mp3"
        },
        {
            name:"You don't know me",
            singer:"Không Biết",
            image:"Image/youdontknowme.jpg",
            audio:"Audio/youDontKnowMe.mp3"
        },
        {
            name:"Chúng Ta Của Hiện Tại",
            singer:"Sơn Tùng MTP",
            image:"Image/chungtacuahientai.jpg",
            audio:"Audio/chungTaCuaHienTai.mp3"
        },
        {
            name:"Enemy",
            singer:"Imagine,Dragons,JID",
            image:"Image/arcane_enemy.jpg",
            audio:"Audio/Enemy__Imagine_Dragons_JID.mp3"
        },
        {
            name:"Mang Tiền Về Cho Mẹ",
            singer:"Đen",
            image:"Image/mangtienvechome.jpg",
            audio:"Audio/MangTienVeChoMe__Den_NguyenThao.mp3"
        },
    ],

    // define properties
    defineProperties: function(){
        Object.defineProperty(this,'CurrentSong',{ get : function(){
            return this.songs[this.currentIndex];
        } })
    },

    //function process
    render : function(){
        
        const listSong=$('.songs__list');
        const duration =$('#audio');
        const control_list=$('.controls__list');
        const bodyRect = document.body.getBoundingClientRect();
        const elemRect = control_list.getBoundingClientRect();
        let offset   = elemRect.top - bodyRect.top + 100;
        console.log(offset);
        listSong.style.paddingTop =`${offset}px`;
        var htmls=this.songs.map((song,index)=>{
            return ` <li class="songs__item">
                            <span class="songs_item-stt">${index + 1}</span>
                            <div class="songs__info">
                                <span class="songs_info-name">${song.name}</span>
                                <span class="songs_info-singer">${song.singer}</span>
                                </div>
                                <span class="songs__option">...</span>
                            </li>`;
        })
        listSong.innerHTML=htmls.join(' ');
    
    },

    loadCurrentSong:function(){
        nameSong.innerHTML='Song : '+this.CurrentSong.name;
        singerSong.innerHTML='Singer : '+this.CurrentSong.singer;
        cd_img.style.backgroundImage = `url('${this.CurrentSong.image}')`;
        wrapper.style.backgroundImage= `url('${this.CurrentSong.image}')`;
        audio.src=this.CurrentSong.audio;
        const songs__list= $$('.songs__item');
        this.activeSong(this.currentIndex,songs__list);

    },

    scroll:function(){
        cd_img.style.height='200px';
        // get width of cd image
        const cd_width=cd_img.offsetWidth;
        const cd_height=cd_img.offsetHeight;

        document.onscroll=function(){
            // get position of Y in window 
            const scrollY_width =document.documentElement.scrollTop || window.scrollY;
            const currentWidth=cd_width - scrollY_width;
            // calculate 
            cd_img.style.width =currentWidth > 0 ? currentWidth + 'px' : 0 ;
            cd_img.style.height =currentWidth > 0 ? currentWidth + 'px' : 0 ;
        }
    },


    controls:function(){

        const _this=this;

         // event rolate when the song played
         const rotate_cd = cd_img.animate([
            {transform: 'rotate(360deg)'},
        ],{
            duration: 10000,
            iterations:Infinity
        });

        // always pause 
        rotate_cd.pause();


        // play 
        btnPlay.onclick=function(){
            audio.play();
        }
        //pause
        btnPause.onclick=function(){
            audio.pause();
        }
        //check audio
        audio.onplay=function(){
            isPlaying=true;
            btnPlay.classList.remove('active');
            btnPause.classList.add('active');
            rotate_cd.play();
        }
        audio.onpause=function(){
            btnPlay.classList.add('active');
            btnPause.classList.remove('active');
            rotate_cd.pause();
        }

        // sự kiện diễn ra khi load xong audio thì cái audio duration từ 0 ,nên thực hiện những công việc này
        audio.ondurationchange = function(){
            const entireMinutes = Math.round(audio.duration  / 60);
            const entireSecond = Math.round(audio.duration  % 60);
            timeEnd.innerHTML = entireMinutes + '.' + entireSecond;
            range.value=0;
        }
        
        // range 
        audio.ontimeupdate = function(){
            range.value=(( audio.currentTime  / audio.duration) * 100 );
            const currentMinutes = Math.round(audio.currentTime  / 60);
            const currentSecond = Math.round(audio.currentTime  % 60);
            timeStart.innerHTML=currentMinutes + '.' + currentSecond;
        }

        range.onchange=function(){
            audio.currentTime = ( range.value / 100) * audio.duration;
        }

        const functionNextSong=function(){

            if(_this.isRandom){
                _this.randDomSong();
            }
            else{
                app.nextSong();

            }
            _this.scrollIntoViewSong();
            audio.play();
        }

        btnNext.onclick=functionNextSong;
        btnPrev.onclick=function(){
            if(_this.isRandom){
                _this.randDomSong();
            }
            else{
                app.prevSong();
            }
            _this.scrollIntoViewSong();
            audio.play();
        }

        btnRandom.onclick=function(){
            _this.isRandom = !_this.isRandom;
            btnRandom.classList.toggle('active',_this.isRandom);
        }

        audio.onended=function(){
            if(_this.isRepeat)
            {
                audio.play();
            }else{
                functionNextSong();
            }
        };

        btnRepeat.onclick=function(){
            _this.isRepeat = !_this.isRepeat;
            btnRepeat.classList.toggle('active',_this.isRepeat);
        }

        // play when click any song
        const songs__list= $$('.songs__item');
        for(let i=0;i<songs__list.length;i++){
           _this.clickSong(i,songs__list);
        }
    },

    scrollIntoViewSong: function(){ 
        setTimeout(()=>{
            var typeBlock ='end';
            if(this.currentIndex > 3){
                typeBlock='nearest';
            }
            $('.songs__item.playing').scrollIntoView({
                behavior:"smooth",
                block:`${typeBlock}`
            });
            console.log( $('.songs__item.playing'));
        },200);
    },
    activeSong : function(index,songs__list){
            for(var songs__item of songs__list){
                songs__item.classList.remove('playing');
            }
            songs__list[index].classList.add('playing');
    },

    clickSong : function(index,songs__list){
        _this=this;
        songs__list[index].onclick=function(e){
            const getSongNotPlaying=e.target.closest('.songs__item:not(.playing)') ;
            const getOption=e.target.closest('.songs__option');
            if(getSongNotPlaying && !getOption){
                _this.currentIndex=index;
                _this.activeSong(_this.currentIndex,songs__list);
                _this.loadCurrentSong();
                audio.play();
            }

            if(getOption){
               alert('mốt rãnh làm tiếp');
            }
        }
    },

    nextSong : function (){
        
        const songs__list= $$('.songs__item');
        this.currentIndex++;
        if(this.currentIndex >= this.songs.length){
            this.currentIndex=0;
        }
        this.activeSong(this.currentIndex,songs__list);
        this.loadCurrentSong();

    },
    prevSong : function (){
        const songs__list= $$('.songs__item');
        this.currentIndex--;
        if(this.currentIndex < 0){
            this.currentIndex=this.songs.length - 1;
        }
        this.activeSong(this.currentIndex,songs__list);
        this.loadCurrentSong();
    },

    randDomSong:function(){
        const songs__list= $$('.songs__item');
        let randomIndex;
        do{
            randomIndex=Math.floor(Math.random()*this.songs.length);
        }while(randomIndex==this.currentIndex);
        this.currentIndex=randomIndex;
        this.activeSong(this.currentIndex,songs__list);
        this.loadCurrentSong();
    },

    start:function(){
        this.defineProperties();
        this.scroll();
        this.render();
        this.loadCurrentSong();
        this.controls();
    }

}


app.start();