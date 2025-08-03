import type {Application} from "../Dashboard.tsx";

// Helper function to determine status based on stage
const getStatusByStage = (stage: number, currentStatus: string): string => {
    if (stage > 1) return 'in-progress';
    return currentStatus === 'completed' ? 'completed' : 'new';
};

const applications: Application[] = [
    {
        "id": "#1254",
        "client": {
            "name": "Иван Смирнов",
            "email": "ivan@example.com",
            "avatar": "https://randomuser.me/api/portraits/men/32.jpg"
        },
        "type": "Проектировка",
        "date": "15.06.2023",
        get status() { return getStatusByStage(this.stages.current, 'new') },
        "stages": { "current": 1, "total": 5 },
        "blueprintPhoto": "https://picsum.photos/800/600"
    },
    {
        "id": "#1255",
        "client": {
            "name": "Мария Козлова",
            "email": "maria.k@example.com",
            "avatar": "https://randomuser.me/api/portraits/women/44.jpg"
        },
        "type": "Проектировка",
        "date": "12.07.2023",
        get status() { return getStatusByStage(this.stages.current, 'in-progress') },
        "stages": { "current": 2, "total": 5 },
        "blueprintPhoto": "https://picsum.photos/800/601"
    },
    {
        "id": "#1256",
        "client": {
            "name": "Алексей Петров",
            "email": "alex.p@example.com",
            "avatar": "https://randomuser.me/api/portraits/men/19.jpg"
        },
        "type": "Проектировка",
        "date": "03.08.2023",
        get status() { return getStatusByStage(this.stages.current, 'review') },
        "stages": { "current": 3, "total": 5 },
        "blueprintPhoto": "https://picsum.photos/800/602"
    },
    {
        "id": "#1257",
        "client": {
            "name": "Елена Васильева",
            "email": "elena.v@example.com",
            "avatar": "https://randomuser.me/api/portraits/women/28.jpg"
        },
        "type": "Проектировка",
        "date": "21.09.2023",
        get status() { return getStatusByStage(this.stages.current, 'review') },
        "stages": { "current": 1, "total": 5 },
        "blueprintPhoto": "https://picsum.photos/800/603"
    },
    {
        "id": "#1258",
        "client": {
            "name": "Дмитрий Орлов",
            "email": "dmitry.o@example.com",
            "avatar": "https://randomuser.me/api/portraits/men/55.jpg"
        },
        "type": "Проектировка",
        "date": "05.10.2023",
        get status() { return getStatusByStage(this.stages.current, 'completed') },
        "stages": { "current": 5, "total": 5 },
        "blueprintPhoto": "https://picsum.photos/800/604"
    },
    {
        "id": "#1259",
        "client": {
            "name": "Наталья Фролова",
            "email": "natalia.f@example.com",
            "avatar": "https://randomuser.me/api/portraits/women/63.jpg"
        },
        "type": "Проектировка",
        "date": "18.11.2023",
        get status() { return getStatusByStage(this.stages.current, 'on_hold') },
        "stages": { "current": 2, "total": 5 },
        "blueprintPhoto": "https://picsum.photos/800/605"
    },
    {
        "id": "#1260",
        "client": {
            "name": "Сергей Морозов",
            "email": "sergey.m@example.com",
            "avatar": "https://randomuser.me/api/portraits/men/41.jpg"
        },
        "type": "Проектировка",
        "date": "30.11.2023",
        get status() { return getStatusByStage(this.stages.current, 'in-progress') },
        "stages": { "current": 2, "total": 5 },
        "blueprintPhoto": "https://picsum.photos/800/606"
    },
    {
        "id": "#1261",
        "client": {
            "name": "Ольга Никитина",
            "email": "olga.n@example.com",
            "avatar": "https://randomuser.me/api/portraits/women/37.jpg"
        },
        "type": "Проектировка",
        "date": "12.12.2023",
        get status() { return getStatusByStage(this.stages.current, 'new') },
        "stages": { "current": 1, "total": 5 },
        "blueprintPhoto": "https://picsum.photos/800/607"
    },
    {
        "id": "#1262",
        "client": {
            "name": "Андрей Лебедев",
            "email": "andrey.l@example.com",
            "avatar": "https://randomuser.me/api/portraits/men/23.jpg"
        },
        "type": "Проектировка",
        "date": "25.12.2023",
        get status() { return getStatusByStage(this.stages.current, 'review') },
        "stages": { "current": 4, "total": 5 },
        "blueprintPhoto": "https://picsum.photos/800/608"
    },
    {
        "id": "#1263",
        "client": {
            "name": "Татьяна Соколова",
            "email": "tatyana.s@example.com",
            "avatar": "https://randomuser.me/api/portraits/women/51.jpg"
        },
        "type": "Проектировка",
        "date": "08.01.2024",
        get status() { return getStatusByStage(this.stages.current, 'in-progress') },
        "stages": { "current": 3, "total": 5 },
        "blueprintPhoto": "https://picsum.photos/800/609"
    }
];
export default applications;