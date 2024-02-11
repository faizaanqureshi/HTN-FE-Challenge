"use client"

import Link from 'next/link';
import { TEvent } from '../types';
import { useAuth } from './AuthContext';

export default function Event({ event, events }: { event: TEvent, events: TEvent[] }) {
    const formattedDate = getFormattedDate(event.start_time);
    const formattedTimeStart = getFormattedTime(event.start_time);
    const formattedTimeEnd = getFormattedTime(event.end_time);
    const formattedEventType = getFormattedEventType(event.event_type);
    const speakers = event.speakers;
    const publicUrl = event.public_url;
    const privateUrl = event.private_url;
    const relatedEvents = events.filter((e) => {
        return event.related_events.includes(e.id);
    });
    const { isLoggedIn } = useAuth()!;

    if (event.permission === "private" && isLoggedIn === false) {
        return <></>
    }

    function scrollToEvent(id: string) {
        const relatedEvent = document.getElementById(id);
        relatedEvent?.scrollIntoView({ behavior: 'smooth' })
        relatedEvent?.classList.add('bg-gray-300/75');

        setTimeout(() => {
            relatedEvent?.classList.remove('bg-gray-300/75');
        }, 750)
    }

    return (
        <div id={`${event.id}`} className="collapse collapse-arrow bg-white/60 max-w-6xl rounded shadow-2xl mt-8">
            <input type="checkbox" />
            <div className="collapse-title">
                <h1 className="text-xl font-bold font-roboto ml-2">{event.name}</h1>
                <div className='pt-2'>
                    <div className="badge badge-error mt-2 ml-2 font-semibold">{formattedDate}</div>
                    <div className="badge badge-secondary mt-2 ml-2 font-semibold">{formattedTimeStart} — {formattedTimeEnd}</div>
                    <div className="badge badge-primary mt-2 ml-2 font-semibold">{formattedEventType}</div>
                    {speakers.map((speaker, index) => (
                        <div key={index} className="badge badge-info mt-2 ml-2 font-semibold">
                            {speaker.name}
                        </div>
                    ))}
                </div>
            </div>
            <div className="collapse-content">
                <p className="m-2 font-medium">{event.description}</p>
                <p className="mt-4 ml-2 font-semibold"><Link href={`${publicUrl}`}>{publicUrl}</Link></p>
                {isLoggedIn ? (
                    <p className="ml-2 mt-1 font-semibold"><Link href={`${privateUrl}`}>{privateUrl}</Link></p>
                ) : ('')
                }
                <div tabIndex={0} className="collapse collapse-plus mt-4">
                    <div className="collapse-title text-md font-medium">
                        Related Events
                    </div>
                    <div className="collapse-content">
                        {relatedEvents.map((relatedEvent: TEvent) => {
                            if ((relatedEvent.permission === "private" && isLoggedIn) || (relatedEvent.permission === "public")) {
                                return <div key={relatedEvent.id} onClick={() => scrollToEvent(relatedEvent.id.toString())} style={{ cursor: 'pointer' }} className="badge badge-neutral font-semibold me-2">{relatedEvent.name}</div>
                            }
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

function getFormattedTime(time: any) {
    const dateStart = new Date(time);
    let hours = dateStart.getUTCHours();
    let minutes = dateStart.getUTCMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours || 12;
    const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
    return formattedTime;
}

function getFormattedDate(time: any) {
    const date = new Date(time);
    let month = date.getMonth();
    let monthName = ''

    switch (month) {
        case 0:
            monthName = "January";
            break;
        case 1:
            monthName = "February";
            break;
        case 2:
            monthName = "March";
            break;
        case 3:
            monthName = "April";
            break;
        case 4:
            monthName = "May";
            break;
        case 5:
            monthName = "June";
            break;
        case 6:
            monthName = "July";
            break;
        case 7:
            monthName = "August";
            break;
        case 8:
            monthName = "September";
            break;
        case 9:
            monthName = "October";
            break;
        case 10:
            monthName = "November";
            break;
        case 11:
            monthName = "December";
            break;
        default:
            monthName = "Invalid month";
    }

    const day = date.getDate();
    const formattedDate = `${monthName} ${day}`
    return formattedDate;
}

function getFormattedEventType(type: string) {
    switch (type) {
        case "workshop":
            return "Workshop";
        case "activity":
            return "Activity";
        case "tech_talk":
            return "Tech Talk";
    }
}