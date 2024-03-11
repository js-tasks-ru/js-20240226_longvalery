export default class SortableTable {
  headerConfig = []; 
  data = [];

  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig; 
    this.data = data;  
    this.element = document.createElement('div');
    this.element.className = "sortable-table";
  }

  formHeader(sortColumn, sortDirection) {
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

  formTable() {
    let body = '<div data-elem="body" class="sortable-table__body">';
    for (let i = 0; i < (this.data.length); i++) {
      body += '<div class="sortable-table__row">';
      if (this.data[i].images != undefined) {
        body += '<div class="sortable-table__cell"><img class="sortable-table-image" alt="?" src="' + this.data[i].images[0].url + '"></div>';
      }
      else {
        body += '<div class="sortable-table__cell">No Photo</div>';
      } 
      body += '<div class="sortable-table__cell">' + this.data[i].title + '</div>';
      body += '<div class="sortable-table__cell">' + this.data[i].quantity + '</div>';
      body += '<div class="sortable-table__cell">' + this.data[i].price + '</div>';
      body += '<div class="sortable-table__cell">' + this.data[i].sales + '</div>';
      body += '</div>';
    }
    body += '</div>';
    return body;

  }

  sort(fieldValue, orderValue) {
    this.data = this.sortColumn(fieldValue, orderValue);
    const line = this.formHeader(fieldValue, orderValue) + 
                 this.formTable();
    this.element.innerHTML = line;
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
  }   
} // end of Class

