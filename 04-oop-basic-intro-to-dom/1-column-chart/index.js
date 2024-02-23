export default class ColumnChart {
  element;
  subElements = {};
  chartHeight = 50;

  constructor({ data = [], label = '', link = '',  value = 0, formatHeading = undefined  } = {}) {
    this.data = data;
    this.label = label;
    this.link = link;
    this.value = value;
    if (formatHeading != undefined) { this.value = formatHeading(this.value);}

    this.render();
                                                                                                 }

  getColumnBody(data) {
    if (Array.isArray(data) && data.length > 0) { 
       const maxValue = Math.max(...data);
       return data.map(item => {
           const scale = this.chartHeight / maxValue;
           const percent = (item / maxValue * 100).toFixed(0);
//           return `<div style="--value: ${item}; text-align: center; top: 50%; margin-top: -0.625em;" data-value="${item}" data-tooltip="${percent}%" class="column-chart__item"></div>`;
           return `<div style="--value: ${Math.floor(item * scale)}; text-align: center; top: 50%; margin-top: -0.625em;" data-value="${item}" data-tooltip="${percent}%" class="column-chart__item"></div>`;
                               }).join('');
                                                }
    else {
       return "charts-skeleton.svg";
         }
                      } 

  getLink() {
    return this.link ? `<a class="column-chart__link" href="${this.link}">View all</a>` : '';
  }

  get template() {
    return `
      <div class="column-chart column-chart_loading" style="--chart-height: ${this.chartHeight}">
        <div class="column-chart__title">
          Total ${this.label}
          ${this.getLink()}
        </div>
        <div class="column-chart__container">
          <div data-element="header" class="column-chart__header">
            ${this.value}
          </div>
          <div data-element="body" class="column-chart__chart">
              ${this.getColumnBody(this.data)}
          </div>
        </div>
      </div>
    `;
  }

  render() {
    const element = document.createElement('div');

    element.innerHTML = this.template;
    this.element = element.firstElementChild;

    if (this.data.length) {
      this.element.classList.remove('column-chart_loading');
    }

    this.subElements = this.getSubElements(this.element);
  }

  getSubElements(element) {
    const elements = element.querySelectorAll('[data-element]');

    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }

/*
  update({headerData, bodyData}) {
    this.subElements.header.textContent = headerData;
    this.subElements.body.innerHTML = this.getColumnBody(bodyData);
  }
*/
  update(data) {
    this.data = data;
               }
  remove () {
    this.element.remove();
  }

  destroy() {
    this.remove();
    this.subElements = {};
  }

  updateSummaryValue() {
     this.value = this.data.reduce((sum, current) => sum + current, 0);    
                       }

}
