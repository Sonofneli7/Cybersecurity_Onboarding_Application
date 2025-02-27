import { Injectable, OnDestroy } from '@angular/core';
import { Note } from '../shared/note.model';
import { BehaviorSubject, Subscription } from 'rxjs';
import { fromEvent } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NoteService implements OnDestroy {
  private notes: Note[] = [];
  private notesSubject: BehaviorSubject<Note[]> = new BehaviorSubject<Note[]>([]);
  storageListenSub: Subscription | undefined;

  // Initial set of notes to populate if nothing is in localStorage
  initialNotes: Note[] = [
    new Note('Welcome Note', [
      'This is the first note in your collection.',
      'Congrats and Welcome to the Team!',
    ]),
    new Note('Parking Access', [
      'Talk with your  Manager',
      'Talk with Phyiscal Security Officers in Building ',
      
    ]),
    new Note('Get Building & Elevator Access with ID credentials', [
      'Contact Building Manager',
      'Contact Physical Security Officers',
      ]),
    new Note('Complete HR paperwork', [
      'NDAs',
      'Background Checks',
      'Security Clearance',
    ]),
    new Note('Computer Log-on: 1st Time', [
      'Username: ID',
      'Password: Password',
    ]),
    new Note('Find Computer Name for future reference', [
      'Go to search (Windows) or spotlight (Mac)',
      'Type: Support Information',
      'Under Computer Information, find "Name:"',
      'On Mac: Scan QR code for setup instructions',
    ]),
    new Note('Set up Accounts', [
      'Email',
      'SSO- single sign on',
      'Privileged access management (PAM)'
    ]),
    new Note('Review Company Policies', [
      'acceptable use',
      'remote use',
      'incident response',
      'data classification',
      'Obtain necessary cybersecurity certifications or training',
    ]),
    new Note('Environment & Access Configuration', [
      'Gain access to security tools: SIEM (e.g., Splunk, QRadar), IDS/IPS, firewalls, vulnerability scanners (Nessus, Qualys), EDR (CrowdStrike, SentinelOne)',
      'Configure access to internal documentation',
      'Set up development/test environments for security testing ',
      'Review asset inventory and network topology maps',
    ]),
    new Note('Security Policies & Incident Response', [
      'Review and understand incident response (IR) plans and escalation procedures',
      'Participate in a tabletop exercise or simulated cyber incident',
      'Familiarize with security compliance frameworks (e.g., NIST, CIS, ISO 27001, SOC 2)',
      'Meet with the compliance/governance team to understand audit and regulatory requirements',
    ]),
    new Note('Threat & Risk Landscape Overview', [
      'Review past security incidents and lessons learned',
      'Understand key threat intelligence sources used by the organization',
      'Learn about third-party vendors and risks',
      'Participate in a red team/blue team exercise or internal penetration testing',
    ]),
    new Note('Security Operations & Monitoring', [
      'Shadow senior security analysts to observe real-time security monitoring',
      'Learn about log analysis and threat detection using SIEM tools',
      'Review alert triage and false positive reduction strategies',
      'Get familiar with automated security workflows',
    ]),
     new Note('Collaboration & Cross-Department Integration', [
      'Meet with key stakeholders: IT, DevOps, compliance, risk management, and leadership',
      'Understand how cybersecurity integrates with software development',
      'Join relevant Slack/Teams channels, mailing lists, and knowledge-sharing sessions',
    ]),
    new Note('Hands-On Practical Tasks', [
      'Conduct an initial vulnerability assessment of internal systems',
      'Perform a risk assessment on a selected application or service',
      'Develop or update security documentation (runbooks, playbooks, checklists)',
      'Test incident response procedures by participating in a phishing simulation or password audit',
    ]),
  ];

  constructor() {
    this.loadState();
    this.notesSubject.next(this.notes);

    // Listen for changes in localStorage related to the 'notes' key
    this.storageListenSub = fromEvent<StorageEvent>(window, 'storage')
      .pipe(
        filter((event) => event.key === 'notes'),
        debounceTime(100) // Avoid rapid reloads by debouncing
      )
      .subscribe(() => {
        this.loadState();
        this.notesSubject.next(this.notes);
      });
  }

  ngOnDestroy(): void {
    if (this.storageListenSub) this.storageListenSub.unsubscribe();
  }

  // Get all notes
  getNotes(): Note[] {
    return this.notes;
  }

  // Get a specific note by ID
  getNote(id: string): Note | undefined {
    return this.notes.find((n) => n.id === id);
  }

  // Add a new note
  addNote(note: Note): void {
    this.notes.push(note);
    this.saveState();
    this.notesSubject.next(this.notes);
  }

  // Update an existing note by ID
  updateNote(id: string, updatedFields: Partial<Note>): void {
    const note = this.getNote(id);
    if (note) {
      Object.assign(note, updatedFields);
      this.saveState();
      this.notesSubject.next(this.notes);
    } else {
      console.warn(`Note with ID ${id} not found.`);
    }
  }

  // Delete a note by ID
  deleteNote(id: string): void {
    const noteIndex = this.notes.findIndex((n) => n.id === id);
    if (noteIndex !== -1) {
      this.notes.splice(noteIndex, 1);
      this.saveState();
      this.notesSubject.next(this.notes);
    } else {
      console.warn(`Note with ID ${id} not found.`);
    }
  }

  // Save notes to localStorage
  saveState(): void {
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  // Load notes from localStorage or use the prepopulated ones if no data exists
  loadState(): void {
    try {
      const notesInStorage = JSON.parse(localStorage.getItem('notes') ?? '[]');

      if (Array.isArray(notesInStorage) && notesInStorage.length > 0) {
        this.notes = notesInStorage.map((note) => ({
          ...note,
          content: Array.isArray(note.content) ? note.content : [note.content],
        }));
      } else {
        this.notes = this.initialNotes;
        this.saveState();
      }

      this.notesSubject.next(this.notes);
    } catch (e) {
      console.error('Failed to load notes from localStorage:', e);
      this.notes = this.initialNotes;
      this.notesSubject.next(this.notes);
    }
  }

  // Expose an observable for other components to subscribe to
  getNotesObservable() {
    return this.notesSubject.asObservable();
  }
}
