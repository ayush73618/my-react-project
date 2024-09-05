import React, { Suspense } from "react";
import { Await, defer, redirect, useRouteLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";

const EventDetails = () => {
  const { event, events } = useRouteLoaderData("event-detail");
  return (
    <>
      <Suspense
        fallback={
          <p style={{ textAlign: "center" }}>Loading Single Events.....</p>
        }
      >
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense
        fallback={
          <p style={{ textAlign: "center" }}>Loading All Events.....</p>
        }
      >
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
};

export default EventDetails;

async function loadEvent(id) {
  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: "Link is not working correctly" }),
      { status: 500 }
    );
  } else {
    // return response;
    const resData = await response.json();
    return resData.event;
  }
}

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: "Link is not working correctly" }),
      { status: 500 }
    );
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

// export async function loader({ request, params }) {
//   const id = params.eventId;
//   const response = await fetch("http://localhost:8080/events/" + id);

//   if (!response.ok) {
//     throw new Response(
//       JSON.stringify({ message: "Link is not working correctly" }),
//       { status: 500 }
//     );
//   } else {
//     return response;
//   }
// }

export async function loader({ request, params }) {
  const id = params.eventId;
  return defer({
    event: await loadEvent(id),
    events: loadEvents(),
  });
}

export async function action({ params }) {
  const eventId = params.eventId;
  const response = await fetch("http://localhost:8080/events/" + eventId, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: "Link is not working correctly" }),
      { status: 500 }
    );
  } else {
    return redirect("/events");
  }
}
