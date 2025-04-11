import { days } from "./constants.mjs";

export class WeekButtons
{
    constructor(startItem)
    {
        this.week = [];
        
        let index = startItem;
        for (let i = 0; i < 7; i++) 
        {
            if (index === 7)
            {
                index = 0;
            }
            
            this.week.push(days[index]);
            index += 1;
        }
        
    }
    setupWeekButtons()
    {
        const weekButtonElement = document.getElementById("print-days");
        if (weekButtonElement)
        {        
            let html = this.printMainDayButton();
            html += this.printWeekButtons();
            weekButtonElement.innerHTML = html;


            document.querySelectorAll('.day-button').forEach(btn => {
                btn.addEventListener('submit',function(event) 
                    {
                        event.preventDefault();

                    });
                });

            document.querySelectorAll('.day-button').forEach(btn => {
                btn.addEventListener('click', () => {
                    if (btn.id != 'all')
                    {
                        btn.classList.toggle('selected');
                    }
                    });
                });
            document.getElementById('all').addEventListener('click', (event) => {
                const currButton = event.target;
                // currButton.classList.toggle('selected');

                if (currButton.classList.contains('selected'))
                {
                    this.deSelectAllButtons();
                }
                else
                {
                    this.selectAllButtons();
                }

            });
            
        }
    }
    selectAllButtons()
    {
        document.querySelectorAll('.day-button').forEach(btn => {
        
            if (!btn.classList.contains('selected')) {
                btn.classList.add('selected');
                }
            });
    }
    deSelectAllButtons()
    {
        document.querySelectorAll('.day-button').forEach(btn => {
            if (btn.classList.contains('selected')) {
                btn.classList.remove('selected');
                }
        });
    }
    printWeekButtons()
    {        
        const html = this.week.map((day) => {
            return this.printDayButton(day);
        });
        
        return html.join('');
    }
    printDayButton(day)
    {
        return `<button class="day-button" id = "${day}" type="submit" name="${day}" value="${day}">${day}</button>`;
    }
    printMainDayButton()
    {
        return `<button class="day-button" id = "all" type="submit" name="all" value="all">All</button>`;
    }
}