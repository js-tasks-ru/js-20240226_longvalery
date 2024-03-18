export default class SortableTable {
  headerConfig = []; 
  data = [];
  element = {};
  subElements = {};
  testElement = {}; 

  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig; 
    this.data = data;  
    this.element = document.createElement('div');
    this.element.className = "sortable-table";
  }

  createHeader(sortColumn, sortDirection) {
    let header = '<div data-elem="header" class="sortable-table__header sortable-table__row bold ">';  
    let isSortable = "";
    for (let i = 0; i < (this.headerConfig.length); i++) {
      isSortable = (this.headerConfig[i]["sortable"]) ? "sortable" : "";  
      header += '<div class="sortable-table__cell" data-name="' +
                    this.headerConfig[i]["id"] + '" ' + isSortable + '><span>' +
                    this.headerConfig[i]["title"] + '</span>';
      if (sortColumn.toLowerCase() == this.headerConfig[i]["id"].toLowerCase()) {
        header += '<span class="sortable-table__cell" data-order="' + sortDirection + '"><span class="sort-arrow "></span></span>';
      }
      header += '</div>';
    } 
    header += '</div>';                                                          
    return header;                                                           
  }

  createSubElements() {
    this.subElements = this.element.querySelectorAll('.sortable-table__row');
    this.testElement = document.body.querySelectorAll('.sortable-table');
  }

  getSubElements(element) {
    const elements = element.querySelectorAll(".sortable-table__row");

    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }


  createTable() {
    let body = '<div data-elem="body" class="sortable-table__body">';
    let line = "";
    for (let i = 0; i < (this.data.length); i++) {
      line = '<div class="sortable-table__row">';
      if (this.data[i].images != undefined) {
        line += '<div class="sortable-table__cell"><img class="sortable-table-image" alt="?" src="' + this.data[i].images[0].url + '"></div>';
      }
      else {
        line += '<div class="sortable-table__cell">No Photo</div>';
      } 
      for (let j = 1; j < this.headerConfig.length; j++) {
        line += '<div class="sortable-table__cell">' + this.data[i][this.headerConfig[j].id] + '</div>';
      }
      line += '</div>';
      body += line;
    }
    body += '</div>';
    return body;
  }

  sort(fieldValue, orderValue) {
    this.data = this.sortColumn(fieldValue, orderValue);
    const line = this.createHeader(fieldValue, orderValue) + this.createTable();
    this.element.innerHTML = line;
    // this.createSubElements();
    this.subElements = this.getSubElements(this.element);
    return ; 
  }                          

  sortColumn(fieldValue, param = 'asc') {
    const result = Array.from(this.data);
    const collator = new Intl.Collator('ru', {caseFirst: 'upper', });
    if (param === 'asc') { 
      result.sort((a, b) => { 
        if ((typeof a[fieldValue] === "number") && (typeof b[fieldValue] === "number")) { return a[fieldValue] - b[fieldValue];}
        else { return collator.compare(a[fieldValue], b[fieldValue]); }
      });
    }
    else { 
      result.sort((a, b) => { 
        if ((typeof a[fieldValue] === "number") && (typeof b[fieldValue] === "number")) { return b[fieldValue] - a[fieldValue];}
        else { return -1 * collator.compare(a[fieldValue], b[fieldValue]); }
      });
    }
    return result;
  }

  destroy() {
    this.element.remove();
    this.subElements = {};
    this.headerConfig = []; 
    this.data = [];  
  }   

   
}


