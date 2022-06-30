// When filtering projects, we need to recalculate cell positions

let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
// const isMobile = vw <= 1080 ? true : false;

const categorySelect = document.querySelector('.category-select');
categorySelect.value = '';

const getProjects = async () => {
    const res = await fetch('../data.json');
    const data = await res.json();
    
    const projects = filterProjects(data.projects, categorySelect.value);

    return projects;
}

const projectsGrid = document.querySelector('[data-projects-grid]');

const appendProjects = projects => {
    const template = document.querySelector('template');

    if(projects.length === 0) return;

    for(let i = 0; i < projects.length; i++) {
        const clone = template.content.firstElementChild.cloneNode(true);
        const source = clone.querySelector('source');
        const img = clone.querySelector('img');

        source.srcset = projects[i].images.webp;
        img.src = projects[i].images.png;
        img.alt = projects[i].images.alt;

        projectsGrid.appendChild(clone);
    }
}

const filterProjects = (projects, value) => {
    return projects.filter(project => project.category.includes(value));
}

const removeProjects = (projects) => {
    projects.forEach(project => {
        projectsGrid.removeChild(project);
    })
} 

let columnValue = 1;
let rowValue = 1;

const assignGridCells = (item, maxColumns) => {
    /* 
        @example <div class="grid-item" data-column="1" data-row="1"></div>

        @desc assign a column/row value to a grid item and determine it's transform origin based on its position within the grid when clicked
    */
        item.setAttribute('data-column', `${columnValue}`);
        item.setAttribute('data-row', `${rowValue}`);


        if(columnValue === maxColumns) {
            columnValue = 0;
            rowValue +=1;
        } 
            
        columnValue += 1;
}

let previouslyClickedGridItem = '';

// mobile/tablet variables
const modal = document.querySelector('[data-project-modal]');
const modalContainer = document.querySelector('.modal__container');
const modalPictureSource = document.querySelector('.modal__project-image source');
const modalPictureImg = document.querySelector('.modal__project-image img');

const enlargeImage = (item, maxColumns, maxRows) => {
    if(vw <= 1080) {
        const picture = item.querySelector('.project-image');
        const alt = picture.querySelector('img').getAttribute('alt');

        // set srcset and src attributes based on the selected image
        modalPictureSource.srcset = picture.querySelector('source').srcset;
        modalPictureImg.src = picture.querySelector('img').src;
        modalPictureImg.setAttribute('alt', alt);
        
        if(!modal.hasAttribute('open')) {
            modal.showModal();
            modal.style.opacity = '1';
            modal.style.transition = 'opacity 100ms ease-in-out';
        }

        closeBtn(modalContainer).setAttribute('aria-pressed', false);
    } else {
        if(previouslyClickedGridItem !== '') {
            previouslyClickedGridItem.classList.remove('enlarge');
        }

        item.classList.add('enlarge');

        const column = Number.parseInt(item.getAttribute('data-column'));
        const row = Number.parseInt(item.getAttribute('data-row'));
        
        if(column === 1 && row === 1) {
            item.style.transformOrigin = 'top left';
        }
        else if((column > 1 && column < maxColumns) && row === 1) {
            item.style.transformOrigin = 'top center';
        }
        else if(column === maxColumns && row === 1) {
            item.style.transformOrigin = 'top right';
        }
        else if(column === 1 && (row > 1 && row < maxRows)) {
            item.style.transformOrigin = 'left';
        }
        else if((column > 1 && column < maxColumns) && (row > 1 && row < maxRows)) {
            item.style.transformOrigin = 'center';
        }
        else if(column === maxColumns && (row > 1 && row < maxRows)) {
            item.style.transformOrigin = 'right';
        }
        else if(column === 1 && row === maxRows) {
            item.style.transformOrigin = 'bottom left';
        }
        else if((column > 1 && column < maxColumns) && row === maxRows) {
            item.style.transformOrigin = 'bottom center';
        }
        else {
            item.style.transformOrigin = 'bottom right';
        }

        previouslyClickedGridItem = item;

        if(closeBtn(item).getAttribute('aria-pressed') === 'true') {
            closeBtn(item).setAttribute('aria-pressed', false);
        }
    }

    closeBtn(modalContainer).addEventListener('click', e => {
        modal.style.opacity = '0';
        modal.style.transition = 'opacity 100ms ease-in-out';
        modal.close();
        closeBtn(modalContainer).setAttribute('aria-pressed', true);
        e.stopPropagation();
    });

    closeBtn(item).addEventListener('click', e => {
        item.classList.remove('enlarge');
        previouslyClickedGridItem = '';
        closeBtn(item).setAttribute('aria-pressed', true);
        e.stopPropagation();
    });
}

// future use?
const equals = (current, previous, index) => {
    previous[index] === current[index];
}

const render = (data) => {
    columnValue = 1;
    rowValue = 1;

    appendProjects(data);
    
    const projectGridItems = document.querySelectorAll('[data-project]');

    const totalProjects = data.length;
    const maxColumns = 3;
    const maxRows = Math.ceil(totalProjects / maxColumns);

    categorySelect.addEventListener('change', () => {
        removeProjects(projectGridItems);
    });
    
    projectGridItems.forEach(gridItem => {
        assignGridCells(gridItem, maxColumns);
        
        gridItem.addEventListener('click', e => {
            if(e.currentTarget.classList.contains("close-btn")) return false;
            enlargeImage(gridItem, maxColumns, maxRows);
        });
    });

}

getProjects().then(data => { 
    render(data);
});

categorySelect.addEventListener('change', () => {
    getProjects().then(data => { 
        render(data);
    });
});

window.addEventListener('resize', () => {
    vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

    if(vw > 1080) {
        modal.close();
    }
});

/*
    ele: the element that is the parent of the specific close button

    @desc close button is universally used throughout the website and thus a utility function was created for it
*/
const closeBtn = parent => {
    return parent.querySelector('[data-close-btn]');
}