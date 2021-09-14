$(document).ready(function() {

    let stt = 0;

    function Student(name, mathScore, physicalScore, chemistryScore) {
        this.name = name;
        this.mathScore = mathScore;
        this.physicalScore = physicalScore;
        this.chemistryScore = chemistryScore;
    }

    //Get new student from input form
    $('#addBtn').click(function() {
        let name = $('#get-name').val();
        let math = $('#get-mathscore').val();
        let physic = $('#get-physcore').val();
        let chemistry = $('#get-chescore').val();

        if (name == '' || math == '' || physic == '' || chemistry == '') {
            // alert('Please enter all of items!')
            notice('All of items must be filled out!');
            return;
        }

        //get name with condition: name must be string
        if (!isNaN(name)) {
            notice('Name can not be numeric. Please re-enter!');
            return;
        }

        //get score with condition: must be numeric between 0 and 10
        if (isNaN(math) || math < 0 || math > 10) {
            notice('Math score must be numeric from 0-10. Please re-enter!');
            return;
        }

        if (isNaN(physic) || physic < 0 || physic > 10) {
            notice('Physics score must be numeric from 0-10. Please re-enter!');
            return;
        }

        if (isNaN(chemistry) || chemistry < 0 || chemistry > 10) {
            notice('Chemistry score must be numeric from 0-10. Please re-enter!');
            return;
        }

        //declare new object and call function to insert into table
        let newStudent = new Student(name, math, physic, chemistry);
        insertStudent(newStudent);
    })

    //Insert new student to new row in data table
    function insertStudent(newStudent) {
        stt++;
        $('#data-table').append(`<tr>
        <td>${stt}</td>
        <td>${newStudent.name}</td>
        <td>${newStudent.mathScore}</td>
        <td>${newStudent.physicalScore}</td>
        <td>${newStudent.chemistryScore}</td>
        <td>?</td>
        <td><i class='bi bi-trash'></i></td>
        </tr>`);
        $('input.form-control').val('');
    }

    //Clear input form
    $('#clearBtn').click(function() {
        $('input.form-control').val('');
    })

    //calculate average marks
    $('#averagecall').click(function() {
        $('tr').each(function() {
            if ($('td:nth-child(6)', this).text() == '?') {
                let mathScore = parseFloat($('td:nth-child(3)', this).text());
                let phyScore = parseFloat($('td:nth-child(4)', this).text());
                let cheScore = parseFloat($('td:nth-child(5)', this).text());
                let averageMarks = ((mathScore + phyScore + cheScore) / 3).toFixed(1);
                //change value of cell to average score
                $('td:nth-child(6)', this).text(averageMarks);
            }
        });
    })

    //highlight good student
    $('#highlightgoodst').click(function() {
        $('tr').each(function() {
            if (parseFloat($('td:nth-child(6)', this).text()) >= 8) {
                $(this).css('color', 'red');
            }
        });
    })

    //search student
    $('#searchbtn').click(function() {
        let key = $('#searchval').val();
        $('tbody>tr').each(function() {
            let name = $('td:nth-child(2)', this).text();
            if (name.indexOf(key) != -1) {
                $(this).css('display');
            } else {
                $(this).css('display', 'none');
            }
        })
    })

    //show all student
    $('#showallst').click(function() {
        $('tbody>tr').each(function() {
            $(this).show();
        })
    })

    //get excell
    $('#getxls').click(function() {
        $('#data-table').table2excel({
            filename: 'Marksheet.xls'
        });
    })

    //getPDF
    $('#getpdf').click(function() {
        let getTable = $('#data-table').html();
        console.log(getTable);

        //create css
        let style = '<style>';
        style += 'table {width: 100%}';
        style += 'table, th, td {border: solid 1px;border-collapse: collapse;';
        style += 'padding: 2px 3px;text-align: center;}';
        style += 'h3{text-align: center;}';
        //remove delete col
        style += 'th:last-child,td:last-child{display: none;}';
        style += '</style>';

        //create window object
        let win = window.open('', '', 'height=1080,width=1080');
        //create html
        let html = '<html><head>';
        html += style;
        html += '</head>';
        html += '<body>';
        html += '<table>'
        html += '<h3>CLASS MARKSHEET</h3>'
        html += getTable;
        html += '</table>';
        html += '</body></html>';

        $(win.document.body).append(html);
        win.print(); //print
    })

    //sort by name
    $('#sortbyname').click(function() {
        let table = $('#body');

        function compare(a, b) {
            return $('td:nth-child(2)', a).text().localeCompare($('td:nth-child(2)', b).text());
        }
        table.find('tr').sort(compare).appendTo(table);
    })

    //delete a row
    $('#data-table').on('click', '.bi', function() {
        $(this).parent().parent().remove();
    });

    //notice
    function notice(content) {
        $('.notification').text(content);
        $('.notification').slideDown('fast');
        window.setTimeout(close, 3000);
    }

    function close() {
        $('.notification').slideToggle('fast');
    }

});