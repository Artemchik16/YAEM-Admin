// Import toast(messages)
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Base messages config for all errors
const baseErrorMessageConfig = {
    autoClose: 1300,
    pauseOnHover: false,
    position: "top-center"
};

// Function for handle errors on login page
export function loginErrors(error) {
    // Handle server error when server is unavailable
    if (!error.response) {
        toast.error('Ошибка, пожалуйста, попробуйте позже.', baseErrorMessageConfig);
    }
    // Error user does not exist
    if (error.response.data.detail == 'No active account found with the given credentials') {
        toast.error('Неверный номер телефона или пароль.', baseErrorMessageConfig);
    }
}

// Function for handle errors on registration page
export function registrationErrors(error) {
    // Handle server error when server is unavailable
    if (!error.response) {
        toast.error('Ошибка, пожалуйста, попробуйте позже.', baseErrorMessageConfig);
    }
    // Check if phone number already exists
    if (error.response.data.phone_number && error.response.data.phone_number[0] === 'This phone number is already registered.') {
        toast.error('Номер телефона уже существует.', baseErrorMessageConfig);
    }
    // Check is number format correct
    if (error.response.data.phone_number && error.response.data.phone_number[0] === 'Введите корректный номер телефона.') {
        toast.error('Пожалуйста, укажите корректный номер.', baseErrorMessageConfig);
    }
    // Check is password format correct
    if (error.response.data.password && error.response.data.password[0] === 'Введённый пароль слишком короткий. Он должен содержать как минимум 8 символов.') {
        toast.error('Введённый пароль слишком короткий.', baseErrorMessageConfig);
    }
    // Check is password format correct
    if (error.response.data.password && error.response.data.password[0] === 'Введённый пароль слишком широко распространён.') {
        toast.error('Введённый пароль слишком широко распространён.', baseErrorMessageConfig);
    }
    // Check is password format correct
    if (error.response.data.password && error.response.data.password[0] === 'Введённый пароль состоит только из цифр.') {
        toast.error('Введённый пароль состоит только из цифр.', baseErrorMessageConfig);
    }
}

// Function for handle errors on create establishment page
export function CreateAndUpdateEstablishmentErrors(error) {
    // Handle server error when server is unavailable
    if (!error.response) {
        toast.error('Ошибка, пожалуйста, попробуйте позже.', baseErrorMessageConfig);
    }
    if (error.response && error.response.data) {
        // Name error
        if (error.response.data.name && error.response.data.name[0] === 'Name: only ru/en/num characters') {
            toast.error('Имя может содержать только русские/английские/численные символы', baseErrorMessageConfig);
        }
        if (error.response.data.name && error.response.data.name[0] === 'Убедитесь, что это значение содержит не более 20 символов.') {
            toast.error('Название не может содержать больше 20 символов', baseErrorMessageConfig);
        }
        // URL error
        if (error.response.data.url_name && error.response.data.url_name[0] === 'Убедитесь, что это значение содержит не более 30 символов.') {
            toast.error('URL не может содержать больше 30 символов', baseErrorMessageConfig);
        }
        if (error.response.data.url_name && error.response.data.url_name[0] === 'The URL name can only contain Latin characters') {
            toast.error('URL может содержать только английские буквы', baseErrorMessageConfig);
        }
        if (error.response.data.url_name && error.response.data.url_name[0] === 'Заведение с таким /url уже существует.') {
            toast.error('URL уже занят', baseErrorMessageConfig);
        }
        // Description error
        if (error.response.data.description && error.response.data.description[0] === 'Убедитесь, что это значение содержит не более 200 символов.') {
            toast.error('Описание не может содержать больше 200 символов', baseErrorMessageConfig);
        }
        // Image error
        if (error.response.data.logo && error.response.data.logo[0] === 'Загруженный файл не является корректным файлом.') {
            toast.error('Загруженный файл не является корректным файлом', baseErrorMessageConfig);
        }
        if (error.response.data.logo && error.response.data.logo[0] === 'Image: max size error(1mb)') {
            toast.error('Недопустимый размер изображения', baseErrorMessageConfig);
        }
        // Address error
        if (error.response.data.address && error.response.data.address[0] === 'Убедитесь, что это значение содержит не более 50 символов.') {
            toast.error('Адрес не может содержать больше 50 символов', baseErrorMessageConfig);
        }
        // Phone error
        if (error.response.data.phone && error.response.data.phone[0] === 'Требуется численное значение.') {
            toast.error('Неверный формат номера телефона', baseErrorMessageConfig);
        }
        if (error.response.data.phone && error.response.data.phone[0] === 'Phone: correct format - "+7XXXXXXXXXX" or "8XXXXXXXXXX"') {
            toast.error('Неверный формат номера телефона', baseErrorMessageConfig);
        }
        // Instagram error
        if (error.response.data.inst && error.response.data.inst[0] === 'Instagram error: pattern - https://www.instagram.com/*') {
            toast.error('Не корректный формат ссылки Instagram', baseErrorMessageConfig);
        }
        if (error.response.data.inst && error.response.data.inst[0] === 'Убедитесь, что это значение содержит не более 100 символов.') {
            toast.error('Instagram не может содержать больше 100 символов.', baseErrorMessageConfig);
        }
        // Two gis error
        if (error.response.data.two_gis && error.response.data.two_gis[0] === 'Two gis error: pattern - https://2gis/*/*') {
            toast.error('Не корректный формат ссылки Two gis', baseErrorMessageConfig);
        }
        if (error.response.data.two_gis && error.response.data.two_gis[0] === 'Убедитесь, что это значение содержит не более 150 символов.') {
            toast.error('Two gis не может содержать больше 150 символов.', baseErrorMessageConfig);
        }
        // Service error
        if (error.response.data.service && error.response.data.service[0] === 'Введите правильное число.') {
            toast.error('Процент обсулживания должен быть числом.', baseErrorMessageConfig);
        }
        if (error.response.data.service && error.response.data.service[0] === 'Service: only range(1, 100)') {
            toast.error('Процент обсулживания должен быть не более 100.', baseErrorMessageConfig);
        }
        // WIFI error
        if (error.response.data.wifi && error.response.data.wifi[0] === 'Убедитесь, что это значение содержит не более 30 символов.') {
            toast.error('WIFI не может содержать больше 30 символов.', baseErrorMessageConfig);
        }
        if (error.response.data.wifi_password && error.response.data.wifi_password[0] === 'Убедитесь, что это значение содержит не более 30 символов.') {
            toast.error('WIFI-Пароль не может содержать больше 30 символов.', baseErrorMessageConfig);
        }
        // Working time error
        if (error.response.data.work_time_start && error.response.data.work_time_start[0] === 'Неправильный формат времени. Используйте один из этих форматов: hh:mm[:ss[.uuuuuu]].') {
            toast.error('Неправильный формат времени(hh:mm).', baseErrorMessageConfig);
        }
        if (error.response.data.work_time_end && error.response.data.work_time_end[0] === 'Неправильный формат времени. Используйте один из этих форматов: hh:mm[:ss[.uuuuuu]].') {
            toast.error('Неправильный формат времени(hh:mm).', baseErrorMessageConfig);
        }
    }
}