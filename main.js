// main.js

const db = {
    users: [],
    issues: []
};

document.getElementById('show-register').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('register-section').classList.remove('hidden');
});

document.getElementById('show-login').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('register-section').classList.add('hidden');
    document.getElementById('login-section').classList.remove('hidden');
});

document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const role = document.getElementById('register-role').value;

    db.users.push({ username, password, role });
    alert('Account created successfully! Please log in.');

    document.getElementById('register-form').reset();
    document.getElementById('register-section').classList.add('hidden');
    document.getElementById('login-section').classList.remove('hidden');
});

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const role = document.getElementById('login-role').value;

    const user = db.users.find(u => u.username === username && u.password === password && u.role === role);

    if (user) {
        document.getElementById('login-section').classList.add('hidden');
        if (role === 'student') {
            document.getElementById('issue-section').classList.remove('hidden');
        } else if (role === 'admin') {
            document.getElementById('admin-section').classList.remove('hidden');
        }
    } else {
        alert('Invalid username, password, or role');
    }
});

const subCategories = {
    'Academic': {
        'Exams': ['Midterm', 'Final'],
        'Grades': ['Assignments', 'Exams'],
        'Assignments': ['Homework', 'Project'],
        'Courses': ['Mathematics', 'Science']
    },
    'Campus': {
        'Hostel': ['Room Issues', 'Facilities'],
        'Canteen': ['Food Quality', 'Service'],
        'Mess': ['Food Quality', 'Hygiene']
    },
    'Health': {
        'Medical Facilities': ['General Check-up', 'Emergency Services'],
        'Counseling Services': ['Mental Health', 'Career Counseling'],
        'Health Records': ['Vaccination', 'Medical History']
    }
};

document.getElementById('category').addEventListener('change', function(event) {
    const subCategorySelect = document.getElementById('sub-category');
    subCategorySelect.innerHTML = '<option value="" disabled selected>Select Subcategory</option>';
    document.getElementById('sub-sub-category').classList.add('hidden');
    document.getElementById('sub-sub-category').innerHTML = '<option value="" disabled selected>Select Sub-Subcategory</option>';

    const category = event.target.value;
    if (subCategories[category]) {
        Object.keys(subCategories[category]).forEach(subCategory => {
            const opt = document.createElement('option');
            opt.value = subCategory;
            opt.textContent = subCategory;
            subCategorySelect.appendChild(opt);
        });
    }
});

document.getElementById('sub-category').addEventListener('change', function(event) {
    const subSubCategorySelect = document.getElementById('sub-sub-category');
    subSubCategorySelect.innerHTML = '<option value="" disabled selected>Select Sub-Subcategory</option>';

    const category = document.getElementById('category').value;
    const subCategory = event.target.value;

    if (subCategories[category] && subCategories[category][subCategory]) {
        subCategories[category][subCategory].forEach(subSubCategory => {
            const opt = document.createElement('option');
            opt.value = subSubCategory;
            opt.textContent = subSubCategory;
            subSubCategorySelect.appendChild(opt);
        });
        subSubCategorySelect.classList.remove('hidden');
    } else {
        subSubCategorySelect.classList.add('hidden');
    }
});

document.getElementById('issue-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const studentName = document.getElementById('student-name').value;
    const studentId = document.getElementById('student-id').value;
    const category = document.getElementById('category').value;
    const subCategory = document.getElementById('sub-category').value;
    const subSubCategory = document.getElementById('sub-sub-category').value;
    const comment = document.getElementById('comment').value;

    const issue = { studentName, studentId, category, subCategory, subSubCategory, comment };
    db.issues.push(issue);

    const issueList = document.getElementById('issue-list');
    const issueItem = document.createElement('li');
    issueItem.textContent = `Name: ${studentName}, Student ID: ${studentId}, Category: ${category}, Subcategory: ${subCategory}, Sub-Subcategory: ${subSubCategory}, Comment: ${comment}`;
    issueList.appendChild(issueItem);

    const adminIssueList = document.getElementById('admin-issue-list');
    const adminIssueItem = document.createElement('li');
    adminIssueItem.textContent = `Name: ${studentName}, Student ID: ${studentId}, Category: ${category}, Subcategory: ${subCategory}, Sub-Subcategory: ${subSubCategory}, Comment: ${comment}`;
    adminIssueList.appendChild(adminIssueItem);

    document.getElementById('issue-form').reset();
    document.getElementById('sub-category').innerHTML = '<option value="" disabled selected>Select Subcategory</option>';
    document.getElementById('sub-sub-category').innerHTML = '<option value="" disabled selected>Select Sub-Subcategory</option>';
    document.getElementById('sub-sub-category').classList.add('hidden');
});
