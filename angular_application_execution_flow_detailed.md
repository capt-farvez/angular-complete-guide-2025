# Angular Application Execution Flow (Deep Dive)

This document explains **how an Angular application starts, runs, and renders in the browser**, including **what happens at browser level**, **what files are created (or not created)**, and **how Angular manages runtime behavior**.

---

## 1. Build Time vs Runtime (Very Important)

Angular has **two distinct phases**:

### 🔹 Build Time
Happens when you run:

```bash
ng serve
# or
ng build
```

At this stage:
- TypeScript ➜ JavaScript
- HTML & CSS are bundled
- Dependency graph is created
- Output is generated in `/dist`

### 🔹 Runtime
Happens when:
- Browser loads the built files
- JavaScript executes
- Angular framework runs in memory

⚠️ **Angular does NOT create files at runtime in the browser**.
Everything runs in **browser memory (RAM)**.

---

## 2. What Files the Browser Actually Loads

After build, the browser loads:

- `index.html`
- One or more JS bundles (example):
  - `main.js`
  - `runtime.js`
  - `polyfills.js`
  - `styles.css`

These are:
- Loaded into browser memory
- Executed by JavaScript engine (V8, SpiderMonkey, etc.)

👉 **No new files are written to disk by Angular**.

---

## 3. Step-by-Step Execution Flow

### Step 1: Browser loads `index.html`

```html
<body>
  <app-root></app-root>
</body>
```

What happens:
- Browser parses HTML
- `<app-root>` is just an unknown HTML tag at this moment
- No Angular yet

---

### Step 2: Browser loads JavaScript bundles

From `index.html`:

```html
<script src="runtime.js"></script>
<script src="polyfills.js"></script>
<script src="main.js"></script>
```

What happens:
- JS engine loads code into memory
- Executes `main.js`

---

### Step 3: Angular starts at `main.ts`

```ts
platformBrowserDynamic()
  .bootstrapModule(AppModule);
```

Internally Angular:
- Creates **root dependency injector**
- Initializes Angular runtime
- Starts change detection engine

---

### Step 4: Angular loads `AppModule`

```ts
@NgModule({
  bootstrap: [AppComponent]
})
export class AppModule {}
```

What happens:
- Registers components
- Registers services
- Resolves providers

⚠️ No DOM changes yet

---

### Step 5: Root Injector is Created

Angular creates a **hierarchical dependency injection tree**:

```text
Root Injector
 ├─ App-wide services
 ├─ HttpClient
 └─ Router
```

Services with:
```ts
providedIn: 'root'
```
are registered here.

---

### Step 6: Bootstrap `AppComponent`

```ts
@Component({ selector: 'app-root' })
export class AppComponent {}
```

What happens:
- Angular finds `<app-root>` in DOM
- Clears its content
- Attaches component instance

---

### Step 7: Template Rendering

```html
<h1>{{ title }}</h1>
```

Rendering steps:
1. Create component instance
2. Evaluate bindings
3. Generate DOM nodes
4. Insert into browser DOM

At this moment:
- Browser DOM is modified
- No files are created

---

## 4. Component Lifecycle (Runtime)

For each component:

```text
constructor()
↓
ngOnChanges()
↓
ngOnInit()
↓
ngAfterViewInit()
```

These are:
- JavaScript function calls
- Executed in memory

---

## 5. Change Detection (Critical Concept)

Angular runs change detection when:
- User clicks
- HTTP response arrives
- Timer fires
- Promise resolves

What happens:
- Angular checks bindings
- Updates DOM if value changed

⚠️ Still **no file system interaction**

---

## 6. Services During Runtime

When a service is injected:

```ts
constructor(private userService: UserService) {}
```

Angular:
1. Checks injector
2. Creates instance (if not exists)
3. Stores it in memory
4. Reuses it

Service lifetime:
- Exists in memory
- Destroyed when page refreshes

---

## 7. Router Execution Flow

```text
URL Change
  ↓
Router matches route
  ↓
Component instance created
  ↓
Template rendered in <router-outlet>
```

Router does:
- Modify browser history (HTML5 History API)
- Does NOT reload page

---

## 8. Browser Storage (Optional)

Angular itself does NOT create storage.
But your app may use:

- `localStorage`
- `sessionStorage`
- `IndexedDB`
- Cookies

These are:
- Explicitly coded by developer
- Managed by browser

---

## 9. What Happens on Page Refresh

```text
Refresh
 ↓
Browser clears JS memory
 ↓
Reloads index.html
 ↓
Angular restarts completely
```

All services & state are lost unless stored externally.

---

## 10. Summary (One Page View)

```text
Browser loads index.html
 ↓
Loads JS bundles into memory
 ↓
main.ts starts Angular
 ↓
Root injector created
 ↓
AppModule loaded
 ↓
AppComponent bootstrapped
 ↓
Templates rendered
 ↓
Change detection runs continuously
```

---

## 11. Key Takeaways

- Angular creates **NO files at runtime**
- Everything runs in **browser memory**
- DOM is updated dynamically
- Dependency Injection controls object creation
- Page refresh resets everything

---

## 12. Next Deep-Dive Topics (Optional)

- Zone.js internals
- Ivy rendering engine
- How Angular differs from React runtime
- Lazy loading execution timeline
- Memory leaks & cleanup

---

**End of Document**

