const BlogButton=()=>{
    window.location.href = '../blog.html'
}

const handleCategory =  async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    

    const tabContainer = document.getElementById('tab-container');
    data.data.forEach((category) => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class = "tabs tabs-boxed">
        <a onclick="handleLoadTube('${category.category_id}')" class="tab bg-red-500 text-white">${category.category}</a> 
        </div>
        `;
        tabContainer.appendChild(div)
    });
    //console.log(data.data)
};

const handleLoadTube = async (categoryId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await response.json();
    //console.log(data.data)
    
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';

    // if(data.data && data.data.length > 0){}
    data.data.forEach((tube) => {
        const postedDateSeconds = parseInt(tube.others.posted_date, 10);
            const postedTime = isNaN(postedDateSeconds)
                ? '' 
                : ` ${Math.floor(postedDateSeconds / 3600)}hrs ${Math.floor((postedDateSeconds % 3600) / 60)}min ago`;
        const verifiedLogo = tube.authors[0].verified? '<img class = "w-5" src = "./verified.png" alt = "">' : '';
        const div = document.createElement('div');
        div.innerHTML = `
        
        <div class="card w-86 h-96 bg-base-100 shadow-xl">
            <figure><img class ="w-full h-60" src=${tube.thumbnail
            } /></figure>
            <div class="my-5 mx-5 flex  gap-4">
            <div>
                <img class="w-[70px] h-[70px]  rounded-[50%]" src=${tube.authors[0].
                    profile_picture}>
            </div>
            <div>
                <h3 class="text-md lg:text-xl font-bold">${tube.title}</h3>
                <div class="relative">
                <div class="flex items-center gap-2 ">
                <p class="text-sm lg:text-lg">${tube.authors[0].profile_name}</p>${verifiedLogo}
                </div>
                <div class ="absolute bottom-24 md:bottom-[108px] lg:bottom-28 left-[107px] md:left-[65px] lg:left-[135px] border-black rounded w-24 text-xs bg-black bg-opacity-80 text-white  pl-2 ">
                ${postedTime ? `<p> ${postedTime}</p>` : ''}
                </div>
                <div>
                <p class="text-sm lg:text-lg">${tube.others.views}</p>
                </div>
                </div> 

            </div>
            
            </div>
        </div>
    
        `;
    cardContainer.appendChild(div);
    });
}
handleCategory();
handleLoadTube('1000')