// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Advanced Search Toggle
const advancedSearchToggle = document.getElementById('advancedSearchToggle');
const advancedSearchOptions = document.getElementById('advancedSearchOptions');

if (advancedSearchToggle && advancedSearchOptions) {
    advancedSearchToggle.addEventListener('click', (e) => {
        e.preventDefault();
        advancedSearchOptions.classList.toggle('active');
        const icon = advancedSearchToggle.querySelector('i');
        icon.classList.toggle('fa-chevron-down');
        icon.classList.toggle('fa-chevron-up');
    });
}

// Password Strength Checker
function checkPasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]+/)) strength++;
    if (password.match(/[A-Z]+/)) strength++;
    if (password.match(/[0-9]+/)) strength++;
    if (password.match(/[!@#$%^&*(),.?":{}|<>]+/)) strength++;
    return strength;
}

// Form Handling
const signupForm = document.getElementById('signupForm');
const signinForm = document.getElementById('signinForm');
const propertyForm = document.getElementById('propertyForm');
const passwordInput = document.getElementById('password');
const passwordStrength = document.getElementById('passwordStrength');

if (passwordInput && passwordStrength) {
    passwordInput.addEventListener('input', (e) => {
        const strength = checkPasswordStrength(e.target.value);
        const strengthText = ['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'];
        const strengthColor = ['#ff4d4d', '#ffa64d', '#ffff4d', '#4dff4d', '#4d4dff'];
        
        if (e.target.value.length > 0) {
            passwordStrength.style.display = 'block';
            passwordStrength.style.backgroundColor = strengthColor[strength - 1];
            passwordStrength.textContent = strengthText[strength - 1];
        } else {
            passwordStrength.style.display = 'none';
        }
    });
}

if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
            fullname: document.getElementById('fullname')?.value,
            email: document.getElementById('email')?.value,
            phone: document.getElementById('phone')?.value,
            userType: document.getElementById('userType')?.value,
            password: document.getElementById('password')?.value,
            confirmPassword: document.getElementById('confirm-password')?.value
        };
        
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        if (checkPasswordStrength(formData.password) < 3) {
            alert('Please choose a stronger password!');
            return;
        }
        
        // Here you would typically send this data to a server
        console.log('Signup form submitted:', formData);
        alert('Account created successfully!');
        window.location.href = 'signin.html';
    });
}

if (signinForm) {
    signinForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
            email: document.getElementById('email')?.value,
            password: document.getElementById('password')?.value,
            remember: document.getElementById('remember')?.checked
        };
        
        // Here you would typically send this data to a server
        console.log('Signin form submitted:', formData);
        alert('Signed in successfully!');
        window.location.href = 'index.html';
    });
}

// Property Form Handling
if (propertyForm) {
    const imageUploadContainer = document.getElementById('imageUploadContainer');
    const imagePreview = document.getElementById('imagePreview');
    const imageInput = document.getElementById('images');

    if (imageUploadContainer && imageInput && imagePreview) {
        imageUploadContainer.addEventListener('click', () => {
            imageInput.click();
        });

        imageInput.addEventListener('change', function(e) {
            const files = Array.from(e.target.files);
            imagePreview.innerHTML = '';
            
            files.forEach(file => {
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const img = document.createElement('img');
                        img.src = e.target.result;
                        img.classList.add('preview-image');
                        const wrapper = document.createElement('div');
                        wrapper.classList.add('image-preview-wrapper');
                        wrapper.appendChild(img);
                        imagePreview.appendChild(wrapper);
                    }
                    reader.readAsDataURL(file);
                }
            });
        });

        // Drag and Drop for Images
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            imageUploadContainer.addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        ['dragenter', 'dragover'].forEach(eventName => {
            imageUploadContainer.addEventListener(eventName, highlight, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            imageUploadContainer.addEventListener(eventName, unhighlight, false);
        });

        function highlight(e) {
            imageUploadContainer.classList.add('highlight');
        }

        function unhighlight(e) {
            imageUploadContainer.classList.remove('highlight');
        }

        imageUploadContainer.addEventListener('drop', handleDrop, false);

        function handleDrop(e) {
            const dt = e.dataTransfer;
            const files = dt.files;
            const dataTransfer = new DataTransfer();
            
            Array.from(files).forEach(file => {
                if (file.type.startsWith('image/')) {
                    dataTransfer.items.add(file);
                }
            });
            
            imageInput.files = dataTransfer.files;
            
            // Trigger change event to update preview
            const event = new Event('change');
            imageInput.dispatchEvent(event);
        }
    }

    propertyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const amenities = Array.from(document.querySelectorAll('input[name="amenities"]:checked'))
            .map(checkbox => checkbox.value);

        const formData = {
            title: document.getElementById('title')?.value,
            type: document.getElementById('type')?.value,
            purpose: document.getElementById('purpose')?.value,
            city: document.getElementById('city')?.value,
            area: document.getElementById('area')?.value,
            address: document.getElementById('address')?.value,
            price: document.getElementById('price')?.value,
            priceType: document.getElementById('priceType')?.value,
            bedrooms: document.getElementById('bedrooms')?.value,
            bathrooms: document.getElementById('bathrooms')?.value,
            totalArea: document.getElementById('area')?.value,
            amenities: amenities,
            description: document.getElementById('description')?.value,
            images: imageInput?.files
        };
        
        // Here you would typically send this data to a server
        console.log('Property form submitted:', formData);
        alert('Property listed successfully!');
        window.location.href = 'index.html';
    });
}

// Property View Details Buttons
const viewDetailsButtons = document.querySelectorAll('.btn-view');
if (viewDetailsButtons) {
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const propertyCard = button.closest('.property-card');
            const propertyTitle = propertyCard.querySelector('h3').textContent;
            alert(`Viewing details for: ${propertyTitle}`);
            // Here you would typically navigate to the property details page
        });
    });
}

// Search Functionality
const searchBtn = document.querySelector('.search-btn');
if (searchBtn) {
    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const location = document.querySelector('.search-group input[type="text"]')?.value;
        const propertyType = document.querySelector('.search-group select:first-of-type')?.value;
        const purpose = document.querySelector('.search-group select:last-of-type')?.value;
        
        // Here you would typically send this data to a server or filter results
        console.log('Search parameters:', { location, propertyType, purpose });
        alert('Searching properties...');
    });
}

// Social Login Handlers
const googleBtn = document.querySelector('.social-btn.google');
const facebookBtn = document.querySelector('.social-btn.facebook');

if (googleBtn) {
    googleBtn.addEventListener('click', () => {
        // Implement Google OAuth login
        console.log('Google login clicked');
        alert('Google login integration coming soon!');
    });
}

if (facebookBtn) {
    facebookBtn.addEventListener('click', () => {
        // Implement Facebook OAuth login
        console.log('Facebook login clicked');
        alert('Facebook login integration coming soon!');
    });
}