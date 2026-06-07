const ham=document.querySelector(".ham")
const aside =document.querySelector("aside")
const projectContainer=document.querySelector(".project-container")
const projectData = {
  "projects": [
    // {
    //   "name": "Shoppingify Website",
    //   "type": "Live Website",
    //   "status": "live",
    //   "project_link": "https://shoppingify-frontend-o6j18g1s8-samcodys-projects.vercel.app/",
    //   "github_link": "https://github.com/alamsameer/Re100Daysof-Code"
    // },
    {
      "name": "Kanban App",
      "type": "Live Website",
      "status": "live",
      "project_link": "https://stellular-elf-ddb524.netlify.app/",
      "github_link": "https://github.com/alamsameer/Re100Daysof-Code"
    },
    {
      "name": "Password Generator",
      "type": "Live Website",
      "status": "live",
      "project_link": "https://github.com/alamsameer/password-generator-mmjidkbme-sam-cody.vercel.app/",
      "github_link": "https://github.com/alamsameer/Re100Daysof-Code"
    },
    {
      "name": "Tip Calculator",
      "type": "Live Website",
      "status": "live",
      "project_link": "https://zen-ardinghelli-dad877.netlify.app/",
      "github_link": "https://github.com/alamsameer/Re100Daysof-Code"
    },
    {
      "name": "Launching Timer",
      "type": "Live Website",
      "status": "live",
      "project_link": "https://eager-goldstine-2194e3.netlify.app/",
      "github_link": "https://github.com/alamsameer/Re100Daysof-Code"
    },
    {
      "name": "Analog Clock",
      "type": "Live Website",
      "status": "live",
      "project_link": "https://100-days-code.vercel.app/",
      "github_link": "https://github.com/alamsameer/Re100Daysof-Code"
    },
    {
      "name": "Hulu-Clone Landing Page",
      "type": "Live Website",
      "status": "live",
      "project_link": "https://angry-goldberg-c55235.netlify.app/",
      "github_link": "https://github.com/alamsameer/Re100Daysof-Code"
    },
    {
      "name": "Manage Landing Page",
      "type": "Live Website",
      "status": "live",
      "project_link": "https://zen-torvalds-c4c779.netlify.app/",
      "github_link": "https://github.com/alamsameer/Re100Daysof-Code"
    },
    {
      "name": "Easybank Landing Page",
      "type": "Live Website",
      "status": "live",
      "project_link": "https://easybank-8pbw1mokg-sam-cody.vercel.app/",
      "github_link": "https://github.com/alamsameer/Re100Daysof-Code"
    },
    {
      "name": "Todo App",
      "type": "Live Website",
      "status": "live",
      "project_link": "https://determined-shockley-d8a4d9.netlify.app/",
      "github_link": "https://github.com/alamsameer/Re100Daysof-Code"
    },
    {
      "name": "Loopstudio Landing Page",
      "type": "Live Website",
      "status": "live",
      "project_link": "https://wizardly-bose-0c1a75.netlify.app/",
      "github_link": "https://github.com/alamsameer/Re100Daysof-Code"
    },
    {
      "name": "Chocolate Landing Page",
      "type": "Live Website",
      "status": "live",
      "project_link": "https://thirsty-heyrovsky-53f593.netlify.app/",
      "github_link": "https://github.com/alamsameer/Re100Daysof-Code"
    },
    {
      "name": "Huddle Landing Page",
      "type": "Live Website",
      "status": "live",
      "project_link": "https://lucid-elion-a45d0a.netlify.app/",
      "github_link": "https://github.com/alamsameer/Re100Daysof-Code"
    }
  ]
}



projectData.projects.forEach(project=>{
    console.log(project);
    
    const projectchild=
    `<div class="project">
            <p>Website</p>
            <div class="project-info-container">
              <div class="project-info" >
                <h4>${project.name}</h4>
              </div>
              <div class="project-links">
              <div class="project-status ${project.status}">${project.status}</div>
                <a
                  href=${project.project_link}
                  target="_blank"
                >
                  <i class="fas fa-external-link-alt"></i>
                </a>
                <a
                  href=${project.github_Link}
                  target="_blank"
                >
                  <i class="fab fa-github"></i>
                </a>
              </div>
            </div>
     </div>`
    projectContainer.innerHTML+=projectchild
})

// document.addEventListener('DOMContentLoaded', function () {
//     const mainImage = document.getElementById('main-image');
//     const thumbnails = document.querySelectorAll('.thumbnail');
  
//     thumbnails.forEach(thumbnail => {
//       thumbnail.addEventListener('click', function () {
//         const newSrc = this.getAttribute('data-large');
//         mainImage.setAttribute('src', newSrc);
//         mainImage.style.opacity = '1';
//       });
//     });
  
//     const projectContainer = document.querySelector('.project-sample-container');
//     projectContainer.addEventListener('mouseout', function () {
//       mainImage.style.opacity = '1';
//       document.querySelector('.thumbnail-container').style.visibility = 'hidden';
//       document.querySelector('.thumbnail-container').style.height = '0';
//     });
//     projectContainer.addEventListener('mouseover', function () {
//       mainImage.style.opacity = '0.5';
//       document.querySelector('.thumbnail-container').style.visibility = 'visible';
//       document.querySelector('.thumbnail-container').style.height = '100px';
//     });
//   });
  
document.addEventListener("DOMContentLoaded", function() {
  const video = document.getElementById("project-video");

  const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              video.play();
          } else {
              video.pause();
          }
      });
  });

  observer.observe(video);
});
