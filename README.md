<div id="top"></div>

# Plan..Action..Repeat 🔄 - IT Ticket Planner

<details>
<summary>Table of contents</summary>

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Features](#features)
- [Screenshots](#screenshots)
- [Link](#link)

</details>

## Overview

Welcome to Plan..Action..Repeat, a client-side web application designed to replace a manual notepad-based system for tracking daily service tickets. This tool provides a structured, visual workflow to prepare for daily review meetings, document action plans, and track progress on Incidents, Tasks, and Service Requests. All data is saved in your browser's local storage, requiring no backend.

## Technology Stack

- **Framework:** React (with Vite)

- **UI Components:** shadcn/ui

- **Styling:** Tailwind CSS

- **State Management:** Zustand

- **Icons:** Lucide React

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/hemanth110702/Plan..Action..Repeat.git
   cd Plan..Action..Repeat

   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Features

- **Dynamic Kanban Board:** Organize tickets into three stages: Backlog, Plan, and Action.

- **Ticket Management:** Add, edit, and delete tickets with details like Priority, SLA, and a Short Description.

- **Visual Status Indicators:** At-a-glance, color-coded badges for ticket Priority (P1-P5) and SLA %.

- **Client-Side Persistence:** All data is saved automatically in the browser's local storage.

- **Search Functionality:** Quickly find any ticket by its ID.

- **Streamlined Reporting:** A "Copy Notes" button formats all items in the "Plan" stage for easy pasting into Microsoft Teams.

- **Tabbed Interface:** Manage different ticket types (Incidents, Tasks, SR) in separate views.

## Screenshots

<table>
    <tr>
        <th>Desktop View</th>
    </tr>
    <tr>
      <td colspan="3" style="text-align: left;font-weight: bold;">Home</td>
    </tr>
    <tr>
        <td>
            <img src="https://github.com/user-attachments/assets/bd450f7c-a13c-4109-817b-9145e69ced66" width="100%" title="Desktop view - Backlog Phase"/>
        </td>
    </tr>
    <tr>
      <td colspan="3" style="text-align: left;font-weight: bold;">My Games</td>
    </tr>
    <tr>
        <td>
            <img src="https://github.com/user-attachments/assets/4843a04a-b953-4d9a-8b23-2c65fa697149" width="100%" title="Desktop view - Plan Phase"/>
        </td>
    </tr>
    <tr>
      <td colspan="3" style="text-align: left;font-weight: bold;">Game Info</td>
    </tr>
    <tr>
        <td>
            <img src="https://github.com/hemanth110702/GameStash/assets/89832451/db91fae3-130d-4cf1-865f-932fda439bac" width="100%" title="Desktop view - Action Phase"/>
        </td>
    </tr>
    <tr>
      <td colspan="3" style="text-align: left;font-weight: bold;">Game Info - video, photos</td>
    </tr>
    <tr>
        <td>
            <img src="https://github.com/user-attachments/assets/e5c72f3c-6f4a-430f-b8aa-c948b52e8ea8" width="100%" title="Desktop view - Add Ticket"/>
        </td>
    </tr> 
    <tr>
      <td colspan="3" style="text-align: left;font-weight: bold;">Light theme</td>
    </tr>
    <tr>
        <td>
            <img src="https://github.com/user-attachments/assets/83e4cd09-cfdd-4e62-97d2-43e18bb29820" width="100%" title="Desktop view - Light theme"/>
        </td>
    </tr> 
</table>

## Link

[🚀 Live Page](https://plan-action-repeat.vercel.app/)

<p align="right"><a href="#top">⬆️ Back to Top</a></p>
