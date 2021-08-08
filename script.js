$(document).ready(function() {

    var stt = 0;

    function Student(name, mathScore, physicalScore, chemistryScore) {
        this.name = name;
        this.mathScore = mathScore;
        this.physicalScore = physicalScore;
        this.chemistryScore = chemistryScore;
    }

    //Add new student from input form
    $("#addBtn").click(function() {
        var name = $("#get-name").val();
        var math = $("#get-mathscore").val();
        var physic = $("#get-physcore").val();
        var chemistry = $("#get-chescore").val();

        var newStudent = new Student(name, math, physic, chemistry);
        if (name == "" || math == "" || physic == "" || chemistry == "") {
            // alert("Please enter all of items!")
            notice();
        } else {
            stt++;
            $("#data-table").append(`<tr>
            <td>${stt}</td>
            <td>${newStudent.name}</td>
            <td>${newStudent.mathScore}</td>
            <td>${newStudent.physicalScore}</td>
            <td>${newStudent.chemistryScore}</td>
            <td>?</td>
            </tr>`);
            $("input.form-control").val("");
        }
    })

    //Clear input form
    $("#clearBtn").click(function() {
        $("input.form-control").val("");
    })

    //calculate average marks
    $("#averagecall").click(function() {
        $("tr").each(function() {
            var math = parseFloat($("td:nth-child(3)", this).text());
            var phy = parseFloat($("td:nth-child(4)", this).text());
            var che = parseFloat($("td:nth-child(5)", this).text());
            var averageMarks = ((math + phy + che) / 3).toFixed(1);

            $("td:nth-child(6)", this).text(averageMarks);
        });
    })

    //highlight good student
    $("#highlightgoodst").click(function() {
        $("tr").each(function() {
            if (parseFloat($("td:nth-child(6)", this).text()) >= 8) {
                $(this).css("color", "red");
            }
        });
    })

    //search student
    $("#searchbtn").click(function() {
        var key = $("#searchval").val();

        $("tbody>tr").each(function() {
            var name = $("td:nth-child(2)", this).text();
            if (name.indexOf(key) > -1) {
                $(this).css("display");
            } else {
                $(this).css("display", "none");
            }
        })
    })

    //show all student
    $("#showallst").click(function() {
        $("tbody>tr").each(function() {
            $(this).show();
        })
    })

    //get excell
    $("#getxls").click(function() {
        $("#data-table").table2excel({
            filename: "Employees.xls"
        });
    })

    //getPDF
    $("#getpdf").click(function() {

        var doc = new jsPDF('p', 'pt', 'letter');
        var pageHeight = 0;
        pageHeight = doc.internal.pageSize.height;

        margins = {
            top: 150,
            bottom: 60,
            left: 40,
            right: 40,
            width: 600
        };
        var y = 20;
        doc.setLineWidth(2);
        doc.text(200, y = y + 30, "CLASS MARKSHEET");
        doc.autoTable({
            html: '#data-table',
            startY: 70,
            theme: 'grid',
            columnStyles: {
                0: {
                    cellWidth: 35,
                },
                1: {
                    cellWidth: 200,
                },
                2: {
                    cellWidth: 70,
                },
                3: {
                    cellWidth: 70,
                },
                4: {
                    cellWidth: 70,
                },
                5: {
                    cellWidth: 70,
                }
            },
            styles: {
                minCellHeight: 30
            }
        })
        doc.save('Marks_Of_Students.pdf');
    })

    //sort by name
    $("#sortbyname").click(function() {
        var table = $('#body');

        function compare(a, b) {
            return $('td:nth-child(2)', a).text().localeCompare($('td:nth-child(2)', b).text());
        }

        table.find('tr').sort(compare).appendTo(table);
    })


    //notice
    function notice() {
        $('.notification').slideDown('slow');
        window.setTimeout(close, 2000);
    }

    function close() {
        $('.notification').slideToggle('slow');
    }




















































});