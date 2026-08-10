/* ==========================================
   STUDYFLOW
   HABIT TRACKER
========================================== */


/* ==========================================
   1. DEFAULT DATA
========================================== */

const subjects = [
    "Accounts",
    "Maths",
    "Law",
    "Economics"
];


const timetable = {

    1: {

        name: "Maths Priority",

        tasks: [

            ["Accounts", "Accounting Process", "06:00", "07:00", "Study"],

            ["Accounts", "Bank Reconciliation", "07:00", "08:00", "Study"],

            ["Accounts", "Trial Balance", "08:00", "08:30", "Study"],

            ["BREAK", "Breakfast / Break", "08:30", "09:30", "Break"],

            ["Law", "Contract Act — Offer", "09:30", "10:30", "Study"],

            ["Law", "Contract Act — Acceptance", "10:30", "11:30", "Study"],

            ["Law", "Offer + Acceptance", "11:30", "12:00", "Revision"],

            ["Law", "Contract Act — Consideration", "12:00", "14:00", "Study"],

            ["BREAK", "Main Break", "14:00", "16:00", "Break"],

            ["Maths", "Ratio & Proportion", "16:15", "17:15", "Study"],

            ["Maths", "Practice Questions", "17:15", "18:15", "Practice"],

            ["Maths", "Today's Maths Revision", "18:15", "19:15", "Revision"]

        ]

    },


    2: {

        name: "Law Priority",

        tasks: [

            ["Accounts", "Accounting Process", "06:00", "07:00", "Study"],

            ["Accounts", "Final Accounts", "07:00", "08:30", "Study"],

            ["BREAK", "Breakfast / Break", "08:30", "09:30", "Break"],

            ["Law", "Contract Act — Consideration", "09:30", "10:30", "Study"],

            ["Law", "Sale of Goods — Conditions", "10:30", "11:30", "Study"],

            ["Economics", "Demand & Supply", "11:40", "12:40", "Study"],

            ["Economics", "Demand Revision", "12:40", "14:00", "Revision"],

            ["BREAK", "Main Break", "14:00", "16:00", "Break"],

            ["Economics", "National Income", "16:15", "17:45", "Study"],

            ["Law", "Law Practice Questions", "17:55", "18:55", "Practice"],

            ["Maths", "Ratio & Proportion Revision", "19:05", "20:05", "Revision"],

            ["Economics", "Economics Revision", "20:15", "21:45", "Revision"]

        ]

    },


    3: {

        name: "Economics Priority",

        tasks: [

            ["Accounts", "Inventories", "06:00", "07:00", "Study"],

            ["Accounts", "Depreciation", "07:00", "08:30", "Study"],

            ["BREAK", "Breakfast / Break", "08:30", "09:30", "Break"],

            ["Economics", "National Income", "09:30", "10:30", "Study"],

            ["Law", "Partnership", "10:40", "11:40", "Study"],

            ["Economics", "Money & Banking", "11:50", "13:20", "Study"],

            ["Law", "Partnership Revision", "13:20", "14:00", "Revision"],

            ["BREAK", "Main Break", "14:00", "16:00", "Break"],

            ["Economics", "Public Finance", "16:15", "17:45", "Study"],

            ["Law", "Law Practice Questions", "17:55", "18:55", "Practice"],

            ["Maths", "Statistics Revision", "19:05", "20:05", "Revision"],

            ["Economics", "Economics Revision", "20:15", "21:45", "Revision"]

        ]

    }

};


/* ==========================================
   2. STARTER SYLLABUS
========================================== */

const starterSyllabus = {

    Accounts: [

        ["Theoretical Framework", 6.5],

        ["Accounting Process", 17.5],

        ["Bank Reconciliation", 12.5],

        ["Inventories", 12.5],

        ["Depreciation", 12.5],

        ["Final Accounts", 17.5]

    ],


    Maths: [

        ["Ratio & Proportion", 6.5],

        ["Time Value of Money", 10],

        ["Linear Programming", 12.5],

        ["Probability", 15],

        ["Statistics", 17.5]

    ],


    Law: [

        ["Contract Act", 22.5],

        ["Sale of Goods", 12.5],

        ["Partnership", 12.5],

        ["Companies Act", 17.5],

        ["Negotiable Instruments", 10]

    ],


    Economics: [

        ["Demand & Supply", 12.5],

        ["National Income", 17.5],

        ["Money & Banking", 12.5],

        ["Public Finance", 10],

        ["International Trade", 12.5]

    ]

};


/* ==========================================
   3. DATA
========================================== */

let data = {

    cycleStartDate: getToday(),

    dailyGoal: 10,

    streakThreshold: 80,

    syllabus: {},

    history: {},

    customTasks: {},

    darkMode: false

};


/* ==========================================
   4. INITIALIZE SYLLABUS
========================================== */

function createSyllabus() {

    subjects.forEach(subject => {

        data.syllabus[subject] = [];

        starterSyllabus[subject].forEach(item => {

            data.syllabus[subject].push({

                id: createId(),

                name: item[0],

                weight: item[1],

                progress: 0

            });

        });

    });

}


/* ==========================================
   5. ID GENERATOR
========================================== */

function createId() {

    return Date.now().toString() +
           Math.random().toString(16).slice(2);

}


/* ==========================================
   6. DATE FUNCTIONS
========================================== */

function getToday() {

    const date = new Date();

    return formatDate(date);

}


function formatDate(date) {

    const year = date.getFullYear();

    const month =
        String(date.getMonth() + 1).padStart(2, "0");

    const day =
        String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;

}


function getDateObject(dateString) {

    const parts = dateString.split("-");

    return new Date(

        Number(parts[0]),

        Number(parts[1]) - 1,

        Number(parts[2])

    );

}


/* ==========================================
   7. SAVE DATA
========================================== */

function saveData() {

    localStorage.setItem(

        "studyFlowData",

        JSON.stringify(data)

    );

    document.getElementById(
        "saveStatus"
    ).textContent = "Saved ✓";

}


/* ==========================================
   8. LOAD DATA
========================================== */

function loadData() {

    const saved =
        localStorage.getItem("studyFlowData");


    if (saved) {

        data = JSON.parse(saved);

    }

    else {

        createSyllabus();

        saveData();

    }


    if (!data.syllabus) {

        createSyllabus();

    }

}


/* ==========================================
   9. CURRENT CYCLE DAY
========================================== */

function getCycleDay(dateString = getToday()) {

    const start =
        getDateObject(data.cycleStartDate);

    const current =
        getDateObject(dateString);


    const difference =
        Math.floor(

            (current - start) /
            (1000 * 60 * 60 * 24)

        );


    const day =
        ((difference % 3) + 3) % 3;


    return day + 1;

}


/* ==========================================
   10. GET TODAY TASKS
========================================== */

function getTasks(dateString = getToday()) {

    if (!data.history[dateString]) {

        const cycle =
            getCycleDay(dateString);


        const tasks =
            timetable[cycle].tasks.map(

                task => ({

                    id: createId(),

                    subject: task[0],

                    topic: task[1],

                    start: task[2],

                    end: task[3],

                    type: task[4],

                    completed: false

                })

            );


        data.history[dateString] = {

            tasks: tasks

        };


        saveData();

    }


    return data.history[dateString].tasks;

}


/* ==========================================
   11. TIME CALCULATION
========================================== */

function getMinutes(start, end) {

    const startParts =
        start.split(":");

    const endParts =
        end.split(":");


    const startMinutes =
        Number(startParts[0]) * 60 +
        Number(startParts[1]);


    const endMinutes =
        Number(endParts[0]) * 60 +
        Number(endParts[1]);


    return endMinutes - startMinutes;

}


/* ==========================================
   12. TODAY STUDY HOURS
========================================== */

function getCompletedMinutes(dateString = getToday()) {

    const tasks =
        getTasks(dateString);


    let total = 0;


    tasks.forEach(task => {

        if (

            task.completed &&
            task.subject !== "BREAK"

        ) {

            total +=
                getMinutes(
                    task.start,
                    task.end
                );

        }

    });


    return total;

}


/* ==========================================
   13. DAILY SCORE
========================================== */

function getDailyScore(dateString = getToday()) {

    const completed =
        getCompletedMinutes(dateString);


    const goal =
        data.dailyGoal * 60;


    if (goal === 0) {

        return 0;

    }


    return Math.min(

        100,

        Math.round(
            (completed / goal) * 100
        )

    );

}


/* ==========================================
   14. SYLLABUS SUBJECT %
========================================== */

function getSubjectProgress(subject) {

    const topics =
        data.syllabus[subject] || [];


    if (topics.length === 0) {

        return 0;

    }


    let totalWeight = 0;

    let completedWeight = 0;


    topics.forEach(topic => {

        totalWeight +=
            Number(topic.weight);


        completedWeight +=

            Number(topic.weight) *
            (Number(topic.progress) / 100);

    });


    if (totalWeight === 0) {

        return 0;

    }


    return Math.round(

        (completedWeight / totalWeight) * 100

    );

}


/* ==========================================
   15. OVERALL SYLLABUS
========================================== */

function getOverallSyllabus() {

    let totalWeight = 0;

    let completedWeight = 0;


    subjects.forEach(subject => {

        const topics =
            data.syllabus[subject] || [];


        topics.forEach(topic => {

            totalWeight +=
                Number(topic.weight);


            completedWeight +=

                Number(topic.weight) *
                (Number(topic.progress) / 100);

        });

    });


    if (totalWeight === 0) {

        return 0;

    }


    return Math.round(

        (completedWeight / totalWeight) * 100

    );

}


/* ==========================================
   16. COMPLETE TOPIC
========================================== */

function completeSyllabusTopic(
    subject,
    topicName
) {

    const topics =
        data.syllabus[subject] || [];


    const topic =
        topics.find(

            item =>

                item.name.toLowerCase()
                ===
                topicName.toLowerCase()

        );


    if (topic) {

        topic.progress = 100;

    }

}


/* ==========================================
   17. TOGGLE TASK
========================================== */

function toggleTask(taskId) {

    const today =
        getToday();


    const tasks =
        getTasks(today);


    const task =
        tasks.find(
            item => item.id === taskId
        );


    if (!task) {

        return;

    }


    task.completed =
        !task.completed;


    /*
       IMPORTANT:

       Revision tasks DO NOT
       mark the syllabus complete.

       Study / Practice tasks DO.
    */

    if (

        task.completed &&

        task.type !== "Revision"

    ) {

        completeSyllabusTopic(

            task.subject,

            task.topic

        );

    }


    saveData();

    renderEverything();

}


/* ==========================================
   18. RENDER TODAY
========================================== */

function renderToday() {

    const container =
        document.getElementById(
            "todayTasks"
        );


    container.innerHTML = "";


    const tasks =
        getTasks();


    tasks.forEach(task => {


        /* BREAK */

        if (task.subject === "BREAK") {

            const breakElement =
                document.createElement("div");


            breakElement.className =
                "study-break";


            breakElement.textContent =

                `— ${task.start}–${task.end}
                · ${task.topic} —`;


            container.appendChild(
                breakElement
            );


            return;

        }


        /* TASK */

        const element =
            document.createElement("div");


        element.className =
            "study-task";


        if (task.completed) {

            element.classList.add(
                "completed"
            );

        }


        const checkbox =
            document.createElement("button");


        checkbox.className =
            "task-checkbox";


        if (task.completed) {

            checkbox.classList.add(
                "completed"
            );

            checkbox.textContent = "✓";

        }


        checkbox.onclick =
            () => toggleTask(task.id);


        const information =
            document.createElement("div");


        information.className =
            "task-information";


        const title =
            document.createElement("strong");


        title.textContent =

            `${task.subject} — ${task.topic}`;


        const time =
            document.createElement("small");


        const minutes =
            getMinutes(
                task.start,
                task.end
            );


        const hours =
            (minutes / 60)
            .toFixed(2)
            .replace(".00", "");


        time.textContent =

            `${task.start}–${task.end}
             · ${hours}h`;


        information.appendChild(title);

        information.appendChild(time);


        const type =
            document.createElement("span");


        type.className =
            "task-type";


        type.textContent =
            task.type;


        element.appendChild(
            checkbox
        );


        element.appendChild(
            information
        );


        element.appendChild(
            type
        );


        container.appendChild(
            element
        );

    });

}


/* ==========================================
   19. UPDATE HEADER
========================================== */

function renderHeader() {

    const today =
        new Date();


    document.getElementById(
        "todayDate"
    ).textContent =

        today.toLocaleDateString(
            undefined,
            {
                weekday: "long",
                month: "long",
                day: "numeric"
            }
        );


    const cycle =
        getCycleDay();


    document.getElementById(
        "cycleDay"
    ).textContent =

        `DAY ${cycle}`;


    document.getElementById(
        "cycleName"
    ).textContent =

        timetable[cycle].name;


    const score =
        getDailyScore();


    document.getElementById(
        "dailyPercentage"
    ).textContent =
        `${score}%`;


    document.getElementById(
        "scoreCircle"
    ).style.setProperty(
        "--progress",
        `${score}%`
    );


    const minutes =
        getCompletedMinutes();


    const hours =
        (minutes / 60)
        .toFixed(1);


    document.getElementById(
        "completedHours"
    ).textContent =

        `${hours}h / ${data.dailyGoal}h`;


    document.getElementById(
        "overallSyllabus"
    ).textContent =

        `${getOverallSyllabus()}%`;


    document.getElementById(
        "currentStreak"
    ).textContent =
        getCurrentStreak();


    document.getElementById(
        "studyStatus"
    ).textContent =
        getStudyStatus();

}


/* ==========================================
   20. STREAK
========================================== */

function isSuccessfulDay(
    dateString
) {

    return getDailyScore(
        dateString
    ) >= data.streakThreshold;

}


function getCurrentStreak() {

    let date =
        new Date();


    let streak = 0;


    while (true) {

        const dateString =
            formatDate(date);


        if (
            isSuccessfulDay(
                dateString
            )
        ) {

            streak++;

            date.setDate(
                date.getDate() - 1
            );

        }

        else {

            break;

        }

    }


    return streak;

}


/* ==========================================
   21. LONGEST STREAK
========================================== */

function getLongestStreak() {

    const dates =
        Object.keys(
            data.history
        ).sort();


    let current = 0;

    let longest = 0;


    dates.forEach(date => {

        if (
            isSuccessfulDay(date)
        ) {

            current++;

            longest =
                Math.max(
                    longest,
                    current
                );

        }

        else {

            current = 0;

        }

    });


    return longest;

}


/* ==========================================
   22. STATUS
========================================== */

function getStudyStatus() {

    const actual =
        getOverallSyllabus();


    /*
       Simple target:

       We expect approximately
       3% syllabus progress per
       10 study hours.

       These thresholds can later
       be customized.
    */

    const daysPassed =
        Math.max(

            1,

            Math.floor(

                (
                    new Date()
                    -
                    getDateObject(
                        data.cycleStartDate
                    )

                )
                /
                (1000 * 60 * 60 * 24)

            ) + 1

        );


    const planned =
        Math.min(
            100,
            daysPassed * 3
        );


    if (
        actual >= planned + 5
    ) {

        return "AHEAD";

    }


    if (
        actual <= planned - 5
    ) {

        return "BEHIND";

    }


    return "ON TRACK";

}


/* ==========================================
   23. RENDER SYLLABUS
========================================== */

function renderSyllabus() {

    const container =
        document.getElementById(
            "subjects"
        );


    container.innerHTML = "";


    subjects.forEach(subject => {


        const card =
            document.createElement(
                "article"
            );


        card.className =
            "subject-card";


        const header =
            document.createElement(
                "div"
            );


        header.className =
            "subject-header";


        const heading =
            document.createElement("h3");


        heading.textContent =
            subject;


        const percentage =
            document.createElement("strong");


        percentage.className =
            "subject-percentage";


        percentage.textContent =

            `${getSubjectProgress(subject)}%`;


        header.appendChild(heading);

        header.appendChild(percentage);


        card.appendChild(header);


        const topics =
            data.syllabus[subject] || [];


        topics.forEach(topic => {


            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "topic-row";


            /* CHECKBOX */

            const checkbox =
                document.createElement(
                    "input"
                );


            checkbox.type =
                "checkbox";


            checkbox.checked =
                topic.progress >= 100;


            checkbox.onchange = () => {

                topic.progress =
                    checkbox.checked
                    ? 100
                    : 0;

                saveData();

                renderEverything();

            };


            /* NAME */

            const name =
                document.createElement(
                    "input"
                );


            name.value =
                topic.name;


            name.onchange = () => {

                topic.name =
                    name.value.trim();

                saveData();

            };


            /* WEIGHT */

            const weight =
                document.createElement(
                    "input"
                );


            weight.type =
                "number";


            weight.step =
                "0.5";


            weight.value =
                topic.weight;


            weight.onchange = () => {

                topic.weight =
                    Number(weight.value);

                saveData();

                renderEverything();

            };


            /* PROGRESS */

            const progress =
                document.createElement(
                    "select"
                );


            const options = [

                [0, "Not Started"],

                [25, "25%"],

                [50, "50%"],

                [75, "75%"],

                [100, "Completed"]

            ];


            options.forEach(option => {

                const opt =
                    document.createElement(
                        "option"
                    );


                opt.value =
                    option[0];


                opt.textContent =
                    option[1];


                if (
                    topic.progress
                    === option[0]
                ) {

                    opt.selected = true;

                }


                progress.appendChild(opt);

            });


            progress.onchange = () => {

                topic.progress =
                    Number(progress.value);

                saveData();

                renderEverything();

            };


            /* DELETE */

            const deleteButton =
                document.createElement(
                    "button"
                );


            deleteButton.className =
                "delete-topic";


            deleteButton.textContent =
                "×";


            deleteButton.onclick = () => {

                if (
                    confirm(
                        "Delete this topic?"
                    )
                ) {

                    data.syllabus[subject] =

                        data.syllabus[
                            subject
                        ].filter(

                            item =>
                                item.id
                                !==
                                topic.id

                        );


                    saveData();

                    renderEverything();

                }

            };


            row.appendChild(
                checkbox
            );

            row.appendChild(
                name
            );

            row.appendChild(
                weight
            );

            row.appendChild(
                progress
            );

            row.appendChild(
                deleteButton
            );


            card.appendChild(row);

        });


        /* ADD TOPIC */

        const addForm =
            document.createElement(
                "form"
            );


        addForm.className =
            "add-topic";


        const topicInput =
            document.createElement(
                "input"
            );


        topicInput.placeholder =
            "Add new topic";


        const weightInput =
            document.createElement(
                "input"
            );


        weightInput.type =
            "number";


        weightInput.placeholder =
            "Weight";


        weightInput.step =
            "0.5";


        const addButton =
            document.createElement(
                "button"
            );


        addButton.type =
            "submit";


        addButton.textContent =
            "Add";


        addForm.appendChild(
            topicInput
        );


        addForm.appendChild(
            weightInput
        );


        addForm.appendChild(
            addButton
        );


        addForm.onsubmit =
            event => {

                event.preventDefault();


                const name =
                    topicInput.value.trim();


                const weight =
                    Number(
                        weightInput.value
                    ) || 1;


                if (!name) {

                    return;

                }


                data.syllabus[
                    subject
                ].push({

                    id: createId(),

                    name: name,

                    weight: weight,

                    progress: 0

                });


                saveData();

                renderEverything();

            };


        card.appendChild(
            addForm
        );


        container.appendChild(
            card
        );

    });

}


/* ==========================================
   24. HISTORY CALENDAR
========================================== */

function renderHistory() {

    const container =
        document.getElementById(
            "historyCalendar"
        );


    container.innerHTML = "";


    const today =
        new Date();


    const year =
        today.getFullYear();


    const month =
        today.getMonth();


    const days =
        new Date(
            year,
            month + 1,
            0
        ).getDate();


    for (
        let day = 1;
        day <= days;
        day++
    ) {


        const date =
            new Date(
                year,
                month,
                day
            );


        const dateString =
            formatDate(date);


        const score =
            data.history[dateString]
            ? getDailyScore(
                dateString
            )
            : 0;


        const box =
            document.createElement(
                "button"
            );


        box.className =
            "history-day";


        if (score === 0) {

            box.classList.add(
                "level-0"
            );

        }

        else if (score < 40) {

            box.classList.add(
                "level-1"
            );

        }

        else if (score < 60) {

            box.classList.add(
                "level-2"
            );

        }

        else if (score < 80) {

            box.classList.add(
                "level-3"
            );

        }

        else if (score < 100) {

            box.classList.add(
                "level-4"
            );

        }

        else {

            box.classList.add(
                "level-5"
            );

        }


        box.innerHTML = `

            <strong>${day}</strong>

            <small>
                ${score}%
            </small>

        `;


        box.onclick = () => {

            showDayDetails(
                dateString
            );

        };


        container.appendChild(
            box
        );

    }

}


/* ==========================================
   25. SHOW DAY DETAILS
========================================== */

function showDayDetails(
    dateString
) {

    if (
        !data.history[dateString]
    ) {

        alert(
            `${dateString}\n\nNo study data recorded.`
        );

        return;

    }


    const tasks =
        data.history[
            dateString
        ].tasks;


    const completed =
        tasks.filter(

            task =>
                task.completed &&
                task.subject !== "BREAK"

        );


    let message =

        `${dateString}\n\n`;


    message +=

        `Score:
        ${getDailyScore(
            dateString
        )}%\n\n`;


    if (
        completed.length === 0
    ) {

        message +=
            "No completed sessions.";

    }

    else {

        completed.forEach(task => {

            message +=

                `✓ ${task.subject}
                — ${task.topic}\n`;

        });

    }


    alert(message);

}


/* ==========================================
   26. WEEKLY COMPLETION
========================================== */

function getWeeklyCompletion() {

    const today =
        new Date();


    const day =
        today.getDay();


    const monday =
        new Date(today);


    monday.setDate(
        today.getDate()
        -
        (day === 0 ? 6 : day - 1)
    );


    let total = 0;


    for (
        let i = 0;
        i < 7;
        i++
    ) {

        const date =
            new Date(monday);


        date.setDate(
            monday.getDate() + i
        );


        total +=
            getDailyScore(
                formatDate(date)
            );

    }


    return Math.round(
        total / 7
    );

}


/* ==========================================
   27. MONTHLY COMPLETION
========================================== */

function getMonthlyCompletion() {

    const today =
        new Date();


    const year =
        today.getFullYear();


    const month =
        today.getMonth();


    const days =
        today.getDate();


    let total = 0;


    for (
        let day = 1;
        day <= days;
        day++
    ) {

        const date =
            new Date(
                year,
                month,
                day
            );


        total +=
            getDailyScore(
                formatDate(date)
            );

    }


    if (days === 0) {

        return 0;

    }


    return Math.round(
        total / days
    );

}


/* ==========================================
   28. PROGRESS PAGE
========================================== */

function renderProgress() {

    const weekly =
        document.getElementById("weeklyCompletion");

    const monthly =
        document.getElementById("monthlyCompletion");

    const longest =
        document.getElementById("longestStreak");

    const topics =
        document.getElementById("completedTopics");


    if (weekly) {
        weekly.textContent =
            `${getWeeklyCompletion()}%`;
    }

    if (monthly) {
        monthly.textContent =
            `${getMonthlyCompletion()}%`;
    }

    if (longest) {
        longest.textContent =
            getLongestStreak();
    }


    let completedTopics = 0;

    subjects.forEach(subject => {

        const subjectTopics =
            data.syllabus[subject] || [];

        subjectTopics.forEach(topic => {

            if (
                Number(topic.progress) >= 100
            ) {
                completedTopics++;
            }

        });

    });


    if (topics) {
        topics.textContent =
            completedTopics;
    }


    // Wait until the Progress page is visible
    requestAnimationFrame(() => {

        drawSubjectProgress();

        drawSyllabusPieChart();

        drawPlannedActualChart();

        drawConsistencyChart();

    });

}


/* ==========================================
   29. CONSISTENCY GRAPH
========================================== */

function drawChart() {

    const canvas =
        document.getElementById(
            "consistencyChart"
        );


    if (!canvas) {

        return;

    }


    const width =
        canvas.clientWidth;


    const height = 260;


    const dpr =
        window.devicePixelRatio || 1;


    canvas.width =
        width * dpr;


    canvas.height =
        height * dpr;


    const ctx =
        canvas.getContext("2d");


    ctx.scale(
        dpr,
        dpr
    );


    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    /* GRID */

    ctx.strokeStyle =
        "#e5e7eb";


    ctx.lineWidth = 1;


    for (
        let i = 0;
        i <= 4;
        i++
    ) {

        const y =
            20 +
            i *
            ((height - 50) / 4);


        ctx.beginPath();

        ctx.moveTo(
            35,
            y
        );

        ctx.lineTo(
            width - 20,
            y
        );

        ctx.stroke();

    }


    /* GET LAST 14 DAYS */

    const values = [];


    for (
        let i = 13;
        i >= 0;
        i--
    ) {

        const date =
            new Date();


        date.setDate(
            date.getDate() - i
        );


        values.push(

            getDailyScore(
                formatDate(date)
            )

        );

    }


    /* TARGET LINE */

    ctx.setLineDash([
        6,
        6
    ]);


    ctx.strokeStyle =
        "#9ca3af";


    ctx.beginPath();


    const targetY =
        20;


    ctx.moveTo(
        35,
        targetY
    );


    ctx.lineTo(
        width - 20,
        targetY
    );


    ctx.stroke();


    ctx.setLineDash([]);


    /* ACTUAL LINE */

    ctx.strokeStyle =
        "#111827";


    ctx.lineWidth = 3;


    ctx.beginPath();


    values.forEach(
        (value, index) => {

            const x =
                35 +
                index *
                (
                    (width - 55) /
                    13
                );


            const y =
                20 +
                (
                    (100 - value)
                    /
                    100
                ) *
                (
                    height - 50
                );


            if (
                index === 0
            ) {

                ctx.moveTo(
                    x,
                    y
                );

            }

            else {

                ctx.lineTo(
                    x,
                    y
                );

            }

        }
    );


    ctx.stroke();


    /* LABELS */

    ctx.fillStyle =
        "#777";


    ctx.font =
        "9px Arial";


    ctx.fillText(
        "100%",
        5,
        23
    );


    ctx.fillText(
        "50%",
        5,
        height / 2
    );


    ctx.fillText(
        "0%",
        10,
        height - 30
    );

}


/* ==========================================
   30. SETTINGS
========================================== */

function renderSettings() {

    document.getElementById(
        "cycleStartDate"
    ).value =
        data.cycleStartDate;


    document.getElementById(
        "dailyGoal"
    ).value =
        data.dailyGoal;


    document.getElementById(
        "streakThreshold"
    ).value =
        data.streakThreshold;

}


/* ==========================================
   31. NAVIGATION
========================================== */

function setupNavigation() {

    document
        .querySelectorAll(".nav-button")
        .forEach(button => {

            button.onclick = () => {

                document
                    .querySelectorAll(".nav-button")
                    .forEach(item =>
                        item.classList.remove("active")
                    );

                button.classList.add("active");


                document
                    .querySelectorAll(".page")
                    .forEach(page =>
                        page.classList.remove("active-page")
                    );


                document
                    .getElementById(button.dataset.page)
                    .classList.add("active-page");


                if (
                    button.dataset.page === "progressPage"
                ) {

                    setTimeout(() => {

                        renderProgress();

                    }, 150);

                }

            };

        });

}


/* ==========================================
   32. ADD TASK
========================================== */

function setupAddTask() {

    const button =
        document.getElementById(
            "addTaskButton"
        );


    const dialog =
        document.getElementById(
            "taskDialog"
        );


    button.onclick = () => {

        dialog.showModal();

    };


    document.getElementById(
        "cancelTask"
    ).onclick = () => {

        dialog.close();

    };


    document.getElementById(
        "taskForm"
    ).onsubmit = event => {

        event.preventDefault();


        const task = {

            id: createId(),

            subject:
                document.getElementById(
                    "taskSubject"
                ).value,

            topic:
                document.getElementById(
                    "taskTopic"
                ).value,

            start:
                document.getElementById(
                    "taskStart"
                ).value,

            end:
                document.getElementById(
                    "taskEnd"
                ).value,

            type:
                document.getElementById(
                    "taskType"
                ).value,

            completed: false

        };


        const today =
            getToday();


        getTasks(today).push(
            task
        );


        saveData();


        dialog.close();


        document.getElementById(
            "taskForm"
        ).reset();


        renderEverything();

    };

}


/* ==========================================
   33. SETTINGS
========================================== */

function setupSettings() {

    document.getElementById(
        "saveSettings"
    ).onclick = () => {


        data.cycleStartDate =
            document.getElementById(
                "cycleStartDate"
            ).value;


        data.dailyGoal =
            Number(
                document.getElementById(
                    "dailyGoal"
                ).value
            );


        data.streakThreshold =
            Number(
                document.getElementById(
                    "streakThreshold"
                ).value
            );


        saveData();


        renderEverything();


        alert(
            "Settings saved ✓"
        );

    };


    document.getElementById(
        "resetData"
    ).onclick = () => {


        const confirmReset =
            confirm(

                "Are you sure you want to delete ALL your study data?"

            );


        if (!confirmReset) {

            return;

        }


        localStorage.removeItem(
            "studyFlowData"
        );


        location.reload();

    };

}


/* ==========================================
   34. DARK MODE
========================================== */

function setupTheme() {

    const button =
        document.getElementById(
            "themeButton"
        );


    if (data.darkMode) {

        document.body.classList.add(
            "dark"
        );

    }


    button.onclick = () => {

        data.darkMode =
            !data.darkMode;


        document.body.classList.toggle(
            "dark"
        );


        saveData();

    };

}


/* ==========================================
   35. EVERYTHING
========================================== */

function renderEverything() {

    renderHeader();

    renderToday();

    renderSyllabus();

    renderHistory();

    renderProgress();

    renderSettings();

}


/* ==========================================
   36. START APPLICATION
========================================== */

function startApplication() {

    loadData();

    setupNavigation();

    setupAddTask();

    setupSettings();

    setupTheme();

    renderEverything();

}


/* START */

startApplication();

window.addEventListener("resize", () => {

    const progressPage =
        document.getElementById("progressPage");

    if (
        progressPage &&
        progressPage.classList.contains("active-page")
    ) {

        renderProgress();

    }

});


console.log(
    "STUDYFLOW JAVASCRIPT IS WORKING"
);

/* ==========================================
   SUBJECT PROGRESS BARS
========================================== */

function drawSubjectProgress() {

    const container =
        document.getElementById(
            "subjectProgressBars"
        );

    if (!container) {
        return;
    }

    container.innerHTML = "";

    subjects.forEach(subject => {

        const percentage =
            getSubjectProgress(subject);

        const item =
            document.createElement("div");

        item.className =
            "subject-progress-item";

        item.innerHTML = `

            <div class="subject-progress-header">

                <strong>${subject}</strong>

                <span>${percentage}%</span>

            </div>

            <div class="subject-progress-track">

                <div
                    class="subject-progress-fill"
                    style="width:${percentage}%"
                ></div>

            </div>

        `;

        container.appendChild(item);

    });

}
/* ==========================================
   SYLLABUS PIE CHART
========================================== */

function drawSyllabusPieChart() {

    const canvas =
        document.getElementById(
            "syllabusPieChart"
        );

    if (!canvas) {
        return;
    }

    const ctx =
        canvas.getContext("2d");

    const width =
        canvas.clientWidth || 400;

    const height = 260;

    const dpr =
        window.devicePixelRatio || 1;

    canvas.width =
        width * dpr;

    canvas.height =
        height * dpr;

    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );

    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    /*
       We use weighted syllabus progress
       for each subject.
    */

    const values =
        subjects.map(subject => {

            return {

                subject: subject,

                value:
                    getSubjectProgress(subject)

            };

        });


    const total =
        values.reduce(
            (sum, item) =>
                sum + item.value,
            0
        );


    if (total === 0) {

        ctx.fillStyle = "#999";

        ctx.font = "12px Arial";

        ctx.textAlign = "center";

        ctx.fillText(
            "Complete some syllabus topics to see the chart",
            width / 2,
            height / 2
        );

        return;

    }


    const centerX =
        width * 0.42;

    const centerY =
        height / 2;

    const radius =
        Math.min(
            width,
            height
        ) * 0.30;


    let startAngle =
        -Math.PI / 2;


    /*
       Browser automatically gives
       different default colors through
       these colors.
    */

    const colors = [

        "#111827",

        "#4b5563",

        "#9ca3af",

        "#d1d5db"

    ];


    values.forEach(
        (item, index) => {

            const slice =
                (
                    item.value /
                    total
                ) *
                Math.PI *
                2;


            ctx.beginPath();

            ctx.moveTo(
                centerX,
                centerY
            );

            ctx.arc(

                centerX,
                centerY,

                radius,

                startAngle,

                startAngle + slice

            );

            ctx.closePath();


            ctx.fillStyle =
                colors[index];

            ctx.fill();


            startAngle += slice;

        }
    );


    /*
       Center hole
       makes it a donut chart.
    */

    ctx.beginPath();

    ctx.arc(

        centerX,
        centerY,

        radius * .55,

        0,
        Math.PI * 2

    );

    ctx.fillStyle =
        "#ffffff";

    ctx.fill();


    /*
       Center percentage
    */

    ctx.fillStyle =
        "#111827";

    ctx.font =
        "bold 18px Arial";

    ctx.textAlign =
        "center";

    ctx.fillText(

        `${getOverallSyllabus()}%`,

        centerX,
        centerY + 6

    );


    /*
       Legend
    */

    values.forEach(
        (item, index) => {

            const y =
                55 + index * 42;

            const x =
                width * .70;


            ctx.fillStyle =
                colors[index];

            ctx.fillRect(
                x,
                y - 9,
                10,
                10
            );


            ctx.fillStyle =
                "#333";

            ctx.font =
                "10px Arial";

            ctx.textAlign =
                "left";

            ctx.fillText(

                `${item.subject} ${item.value}%`,

                x + 17,
                y

            );

        }
    );

}
function drawPlannedActualChart() {

    const canvas =
        document.getElementById("plannedActualChart");

    if (!canvas) {
        console.log("plannedActualChart not found");
        return;
    }

    const width =
        canvas.parentElement.clientWidth || 700;

    const height = 280;

    const dpr =
        window.devicePixelRatio || 1;

    canvas.width =
        width * dpr;

    canvas.height =
        height * dpr;

    canvas.style.width = "100%";
    canvas.style.height = height + "px";

    const ctx =
        canvas.getContext("2d");

    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );

    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    /* -----------------------------------------
       DATA
    ----------------------------------------- */

    const start =
        getDateObject(data.cycleStartDate);

    const today =
        getDateObject(getToday());

    let daysPassed =
        Math.floor(
            (today - start) /
            (1000 * 60 * 60 * 24)
        ) + 1;

    daysPassed =
        Math.max(1, daysPassed);

    const numberOfDays =
        Math.min(daysPassed, 14);


    const planned = [];

    const actual = [];


    for (
        let i = 1;
        i <= numberOfDays;
        i++
    ) {

        /* Planned progress:
           30 days = 100% */

        planned.push(
            Math.min(
                100,
                (i / 30) * 100
            )
        );


        /* Actual progress */

        const date =
            new Date(start);

        date.setDate(
            start.getDate() + i - 1
        );

        const dateKey =
            formatDate(date);


        let actualValue;

        if (
            data.progressHistory &&
            data.progressHistory[dateKey] !== undefined
        ) {

            actualValue =
                Number(
                    data.progressHistory[dateKey]
                );

        } else {

            actualValue = 0;

        }


        actual.push(actualValue);

    }


    /* -----------------------------------------
       CHART SIZE
    ----------------------------------------- */

    const left = 45;

    const right = 20;

    const top = 30;

    const bottom = 35;

    const chartWidth =
        width - left - right;

    const chartHeight =
        height - top - bottom;


    /* -----------------------------------------
       TITLE
    ----------------------------------------- */

    ctx.fillStyle = "#111827";

    ctx.font =
        "bold 14px Arial";

    ctx.textAlign = "left";

    ctx.fillText(
        "Planned vs Actual",
        left,
        18
    );


    /* -----------------------------------------
       GRID
    ----------------------------------------- */

    for (
        let value = 0;
        value <= 100;
        value += 20
    ) {

        const y =
            top +
            chartHeight -
            (
                value / 100
            ) *
            chartHeight;


        ctx.strokeStyle =
            "#e5e7eb";

        ctx.lineWidth = 1;

        ctx.beginPath();

        ctx.moveTo(
            left,
            y
        );

        ctx.lineTo(
            width - right,
            y
        );

        ctx.stroke();


        ctx.fillStyle =
            "#777";

        ctx.font =
            "9px Arial";

        ctx.textAlign =
            "right";

        ctx.fillText(
            value + "%",
            left - 7,
            y + 3
        );

    }


    /* -----------------------------------------
       DRAW LINE
    ----------------------------------------- */

    function drawLine(
        values,
        lineColor,
        dashed
    ) {

        if (!values.length)
            return;


        ctx.beginPath();


        values.forEach(
            (value, index) => {

                const x =
                    values.length === 1

                    ? left + chartWidth / 2

                    : left +
                      (
                          index /
                          (values.length - 1)
                      ) *
                      chartWidth;


                const y =
                    top +
                    chartHeight -
                    (
                        value / 100
                    ) *
                    chartHeight;


                if (index === 0) {

                    ctx.moveTo(
                        x,
                        y
                    );

                } else {

                    ctx.lineTo(
                        x,
                        y
                    );

                }

            }
        );


        ctx.strokeStyle =
            lineColor;

        ctx.lineWidth = 3;

        ctx.setLineDash(
            dashed
                ? [7, 5]
                : []
        );

        ctx.stroke();

        ctx.setLineDash([]);


        /* Points */

        values.forEach(
            (value, index) => {

                const x =
                    values.length === 1

                    ? left + chartWidth / 2

                    : left +
                      (
                          index /
                          (values.length - 1)
                      ) *
                      chartWidth;


                const y =
                    top +
                    chartHeight -
                    (
                        value / 100
                    ) *
                    chartHeight;


                ctx.beginPath();

                ctx.arc(
                    x,
                    y,
                    4,
                    0,
                    Math.PI * 2
                );

                ctx.fillStyle =
                    lineColor;

                ctx.fill();

            }
        );

    }


    /* -----------------------------------------
       PLANNED LINE
    ----------------------------------------- */

    drawLine(
        planned,
        "#9ca3af",
        true
    );


    /* -----------------------------------------
       ACTUAL LINE
    ----------------------------------------- */

    drawLine(
        actual,
        "#111827",
        false
    );


    /* -----------------------------------------
       DAY LABELS
    ----------------------------------------- */

    ctx.textAlign =
        "center";

    ctx.font =
        "9px Arial";

    for (
        let i = 0;
        i < numberOfDays;
        i++
    ) {

        const x =
            numberOfDays === 1

            ? left + chartWidth / 2

            : left +
              (
                  i /
                  (numberOfDays - 1)
              ) *
              chartWidth;


        ctx.fillStyle =
            "#777";

        ctx.fillText(
            `Day ${i + 1}`,
            x,
            height - 10
        );

    }


    /* -----------------------------------------
       LEGEND
    ----------------------------------------- */

    ctx.textAlign =
        "left";

    ctx.font =
        "9px Arial";


    ctx.fillStyle =
        "#9ca3af";

    ctx.fillText(
        "— Planned",
        width - 140,
        18
    );


    ctx.fillStyle =
        "#111827";

    ctx.fillText(
        "— Actual",
        width - 75,
        18
    );


    /* -----------------------------------------
       STATUS
    ----------------------------------------- */

    const currentActual =
        getOverallSyllabus();

    const currentPlanned =
        planned[planned.length - 1];


    updateScheduleStatus(
        currentPlanned,
        currentActual
    );


    console.log(
        "Planned vs Actual graph rendered"
    );

}


/* =====================================================
   SCHEDULE STATUS
===================================================== */

function updateScheduleStatus(
    planned,
    actual
) {

    const element =
        document.getElementById(
            "scheduleStatus"
        );

    if (!element)
        return;


    const difference =
        actual - planned;


    element.className = "";


    if (difference >= 5) {

        element.textContent =
            "🟢 AHEAD OF SCHEDULE";

        element.classList.add(
            "status-ahead"
        );

    }

    else if (difference <= -5) {

        element.textContent =
            "🔴 BEHIND SCHEDULE";

        element.classList.add(
            "status-behind"
        );

    }

    else {

        element.textContent =
            "🟡 ON TRACK";

        element.classList.add(
            "status-track"
        );

    }

}

