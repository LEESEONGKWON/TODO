document.addEventListener("DOMContentLoaded", function () {
    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();
  const currentDate = new Date().getDate();  // 오늘 날짜

    const dayString = loadDayString(); // 로컬 스토리지에서 dayString 불러오기

    // dayString을 로컬 스토리지에서 불러오는 함수
    function loadDayString() {
        const storedData = localStorage.getItem('dayString');
        return storedData ? JSON.parse(storedData) : {};
    }

    // dayString을 로컬 스토리지에 저장하는 함수
    function saveDayString() {
        localStorage.setItem('dayString', JSON.stringify(dayString));
    }

    // dayString을 가져오는 함수 (기본값 "default" 설정)
    function getDayString(year, month, day) {
        const key = `${year}-${month + 1}`;
        if (!dayString[key]) {
            dayString[key] = {};
        }
        if (!dayString[key][day]) {
            dayString[key][day] = ""; // 기본값 "default"로 설정
        }
        return dayString[key][day];
    }

    // 달력을 생성하는 함수
    function generateCalendar(year, month) {
        const monthNames = ["1", "2", "3", "4", "5", "6", "7","8", "9", "10", "11", "12"];
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // 월 이름 업데이트
        document.getElementById('month-name').textContent = `${year} ${monthNames[month]}`;
        const dateContainer = document.getElementById('date-container');
        dateContainer.innerHTML = '';

        // 빈 공간 추가 (첫째 날이 시작되는 위치까지)
        for (let i = 0; i < firstDay; i++) {
            const emptyDiv = document.createElement('div');
            emptyDiv.classList.add('date');
            dateContainer.appendChild(emptyDiv);
        }

        // 날짜 추가
        for (let day = 1; day <= daysInMonth; day++) {
            const dateDiv = document.createElement('div');
            dateDiv.classList.add('date');

            const dayText = document.createElement('span');
            dayText.textContent = day;
            dateDiv.appendChild(dayText);

            const lineBreak = document.createElement('br');
            dateDiv.appendChild(lineBreak);

            const userInput = document.createElement('span');
            userInput.classList.add('user-input');
            userInput.textContent = getDayString(year, month, day); // "default"로 초기화
            dateDiv.appendChild(userInput);

            if (day === currentDate && month === new Date().getMonth() && year === new Date().getFullYear()) {
                            dateDiv.classList.add('today'); // 'today' 클래스를 추가하여 강조
                        }

            // 날짜를 클릭할 때마다 메모를 입력받고 dayString에 저장
            dateDiv.addEventListener('click', function () {
                const input = prompt(`Enter your note for ${day}:`, userInput.textContent);
                if (input !== null) {
                    const key = `${year}-${month + 1}`;
                    if (!dayString[key]) {
                        dayString[key] = {};
                    }
                    dayString[key][day] = input; // 입력된 메모 저장
                    userInput.textContent = input;
                    saveDayString(); // 메모가 추가된 후, 로컬 스토리지에 저장
                    displayDayString(); // 메모가 추가된 후, dayString을 업데이트하여 출력
                }
            });

            dateContainer.appendChild(dateDiv);
        }
    }

    // 달을 변경하는 함수 (이전 달 또는 다음 달)
    function changeMonth(direction) {
        currentMonth += direction;

        // 12월 이후 1월로 넘어가고, 1월 이전 12월로 넘어가도록 처리
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        } else if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }

        // 새 달을 생성
        generateCalendar(currentYear, currentMonth);

    }


    // 달력 생성
    generateCalendar(currentYear, currentMonth);

    // 버튼 클릭 이벤트 리스너 등록
    document.getElementById('prev-month').addEventListener('click', function() {
        changeMonth(-1); // 이전 달
    });

    document.getElementById('next-month').addEventListener('click', function() {
        changeMonth(1); // 다음 달
    });
});
