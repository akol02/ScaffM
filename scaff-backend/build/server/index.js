import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts, useNavigate, useLocation, NavLink, Link as Link$1 } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { Loader2Icon, OctagonXIcon, TriangleAlertIcon, InfoIcon, CircleCheckIcon, XIcon, ChevronRight, Menu, LayoutDashboard, Users, Store, HardHat, MapPin, Layers, Package, Warehouse, Percent, Globe, Database, ClipboardList, ShoppingCart, FileText, Undo2, AlertTriangle, Scale, Truck, Building2, CalendarRange, Landmark, Settings, User, UserCog, LogOut, ChevronDown, Wallet, Box, Activity, ArrowUpRight, ArrowDownRight, ChevronDownIcon, CheckIcon, ChevronUpIcon, Plus, CreditCard, Pencil, Phone, Trash2, Mail, Search, Save, ArrowUpCircle, ArrowDownCircle, Clock, ChevronLeft, CalendarIcon, CheckCircle2, ShoppingBag, Calculator, Loader2, CloudDownload, Link, ArrowRightLeft, Copy } from "lucide-react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useTheme } from "next-themes";
import { Toaster as Toaster$1, toast } from "sonner";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { motion } from "framer-motion";
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, PieChart, Pie, Cell, Legend } from "recharts";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as SelectPrimitive from "@radix-ui/react-select";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import * as PopoverPrimitive from "@radix-ui/react-popover";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  if (request.method.toUpperCase() === "HEAD") {
    return new Response(null, {
      status: responseStatusCode,
      headers: responseHeaders
    });
  }
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function Avatar({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AvatarPrimitive.Root,
    {
      "data-slot": "avatar",
      className: cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      ),
      ...props
    }
  );
}
function AvatarImage({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AvatarPrimitive.Image,
    {
      "data-slot": "avatar-image",
      className: cn("aspect-square size-full", className),
      ...props
    }
  );
}
function AvatarFallback({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AvatarPrimitive.Fallback,
    {
      "data-slot": "avatar-fallback",
      className: cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      ),
      ...props
    }
  );
}
const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();
  return /* @__PURE__ */ jsx(
    Toaster$1,
    {
      theme,
      className: "toaster group",
      icons: {
        success: /* @__PURE__ */ jsx(CircleCheckIcon, { className: "size-4" }),
        info: /* @__PURE__ */ jsx(InfoIcon, { className: "size-4" }),
        warning: /* @__PURE__ */ jsx(TriangleAlertIcon, { className: "size-4" }),
        error: /* @__PURE__ */ jsx(OctagonXIcon, { className: "size-4" }),
        loading: /* @__PURE__ */ jsx(Loader2Icon, { className: "size-4 animate-spin" })
      },
      style: {
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
        "--border-radius": "var(--radius)"
      },
      ...props
    }
  );
};
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "button",
      "data-variant": variant,
      "data-size": size,
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
function Sheet({ ...props }) {
  return /* @__PURE__ */ jsx(SheetPrimitive.Root, { "data-slot": "sheet", ...props });
}
function SheetTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(SheetPrimitive.Trigger, { "data-slot": "sheet-trigger", ...props });
}
function SheetPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx(SheetPrimitive.Portal, { "data-slot": "sheet-portal", ...props });
}
function SheetOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SheetPrimitive.Overlay,
    {
      "data-slot": "sheet-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function SheetContent({
  className,
  children,
  side = "right",
  ...props
}) {
  return /* @__PURE__ */ jsxs(SheetPortal, { children: [
    /* @__PURE__ */ jsx(SheetOverlay, {}),
    /* @__PURE__ */ jsxs(
      SheetPrimitive.Content,
      {
        "data-slot": "sheet-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          side === "right" && "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "left" && "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" && "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side === "bottom" && "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className
        ),
        ...props,
        children: [
          children,
          /* @__PURE__ */ jsxs(SheetPrimitive.Close, { className: "ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none", children: [
            /* @__PURE__ */ jsx(XIcon, { className: "size-4" }),
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] });
}
function SheetTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SheetPrimitive.Title,
    {
      "data-slot": "sheet-title",
      className: cn("text-foreground font-semibold", className),
      ...props
    }
  );
}
function SheetDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SheetPrimitive.Description,
    {
      "data-slot": "sheet-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
const Collapsible = CollapsiblePrimitive.Root;
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;
const Menubar = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(MenubarPrimitive.Root, { ref, className: cn("flex h-10 items-center space-x-1 rounded-md border bg-background p-1", className), ...props }));
Menubar.displayName = MenubarPrimitive.Root.displayName;
const MenubarMenu = MenubarPrimitive.Menu;
const MenubarTrigger = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(MenubarPrimitive.Trigger, { ref, className: cn("flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground", className), ...props }));
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName;
const MenubarSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(MenubarPrimitive.SubTrigger, { ref, className: cn("flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground", inset && "pl-8", className), ...props, children: [
  children,
  " ",
  /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto h-4 w-4" })
] }));
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName;
const MenubarSubContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(MenubarPrimitive.SubContent, { ref, className: cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className), ...props }));
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName;
const MenubarContent = React.forwardRef(({ className, align = "start", alignOffset = -4, sideOffset = 8, ...props }, ref) => /* @__PURE__ */ jsx(MenubarPrimitive.Portal, { children: /* @__PURE__ */ jsx(MenubarPrimitive.Content, { ref, align, alignOffset, sideOffset, className: cn("z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className), ...props }) }));
MenubarContent.displayName = MenubarPrimitive.Content.displayName;
const MenubarItem = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(MenubarPrimitive.Item, { ref, className: cn("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", inset && "pl-8", className), ...props }));
MenubarItem.displayName = MenubarPrimitive.Item.displayName;
const MenubarSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(MenubarPrimitive.Separator, { ref, className: cn("-mx-1 my-1 h-px bg-muted", className), ...props }));
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName;
function DropdownMenu({
  ...props
}) {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Root, { "data-slot": "dropdown-menu", ...props });
}
function DropdownMenuTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Trigger,
    {
      "data-slot": "dropdown-menu-trigger",
      ...props
    }
  );
}
function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Content,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset,
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
        className
      ),
      ...props
    }
  ) });
}
function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": inset,
      "data-variant": variant,
      className: cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function DropdownMenuLabel({
  className,
  inset,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Label,
    {
      "data-slot": "dropdown-menu-label",
      "data-inset": inset,
      className: cn(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        className
      ),
      ...props
    }
  );
}
function DropdownMenuSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: cn("bg-border -mx-1 my-1 h-px", className),
      ...props
    }
  );
}
const Switch = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SwitchPrimitives.Root,
  {
    className: cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-orange-600 data-[state=unchecked]:bg-slate-200",
      className
    ),
    ...props,
    ref,
    children: /* @__PURE__ */ jsx(
      SwitchPrimitives.Thumb,
      {
        className: cn(
          "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  }
));
Switch.displayName = SwitchPrimitives.Root.displayName;
const menuGroups = [{
  label: "Overview",
  items: [{
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/"
  }]
}, {
  label: "Masters",
  icon: Database,
  items: [{
    label: "Customers",
    icon: Users,
    path: "/customers"
  }, {
    label: "Vendors",
    icon: Store,
    path: "/vendors"
  }, {
    label: "Employees",
    icon: HardHat,
    path: "/employees"
  }, {
    label: "Sites / Projects",
    icon: MapPin,
    path: "/sites"
  }, {
    label: "Item Groups",
    icon: Layers,
    path: "/groups"
  }, {
    label: "Item Master",
    icon: Package,
    path: "/items"
  }, {
    label: "Warehouses",
    icon: Warehouse,
    path: "/warehouses"
  }, {
    label: "Tax Codes",
    icon: Percent,
    path: "/tax-codes"
  }, {
    label: "State Master",
    icon: Globe,
    path: "/states"
  }]
}, {
  label: "Inventory",
  icon: ClipboardList,
  items: [
    {
      label: "Operations (In/Out)",
      icon: Package,
      path: "/inventory"
    }
    // { label: "Challans (Delivery)", icon: FileText, path: "/challans" },
  ]
}, {
  label: "Sales",
  icon: ShoppingCart,
  items: [{
    label: "Sales Orders",
    icon: ShoppingCart,
    path: "/sales"
  }]
}, {
  label: "Store",
  icon: Truck,
  items: [{
    label: "Delivery Challan",
    icon: FileText,
    path: "/delivery-challans"
  }, {
    label: "Rental GRN (Return)",
    icon: Undo2,
    path: "/rental-grn"
  }, {
    label: "Missing Entries",
    icon: AlertTriangle,
    path: "/missing-entries"
  }, {
    label: "Item Adjustment",
    icon: Scale,
    path: "/adjustments"
  }]
}, {
  label: "Administration",
  icon: UserCog,
  items: [{
    label: "Company Profile",
    icon: Building2,
    path: "/company"
  }, {
    label: "Fiscal Years",
    icon: CalendarRange,
    path: "/fiscal-years"
  }, {
    label: "Currencies",
    icon: Landmark,
    path: "/currencies"
  }, {
    label: "User Management",
    icon: Users,
    path: "/users"
  }, {
    label: "Settings",
    icon: Settings,
    path: "/settings"
  }, {
    label: "My Profile",
    icon: User,
    path: "/profile"
  }]
}];
const dashboardLayout = UNSAFE_withComponentProps(function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState("left");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
    const savedPos = localStorage.getItem("menuPosition");
    if (savedPos === "left" || savedPos === "top") {
      setMenuPosition(savedPos);
    }
  }, [navigate, location]);
  const toggleMenuPosition = (checked) => {
    const pos = checked ? "top" : "left";
    setMenuPosition(pos);
    localStorage.setItem("menuPosition", pos);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  const SidebarMenuItem = ({
    item,
    onClick
  }) => /* @__PURE__ */ jsxs(NavLink, {
    to: item.path,
    onClick,
    className: ({
      isActive
    }) => cn("flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all ml-2", isActive ? "bg-orange-50 text-orange-700 border-l-4 border-orange-600 shadow-sm" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 border-l-4 border-transparent"),
    children: [/* @__PURE__ */ jsx(item.icon, {
      size: 16
    }), item.label]
  });
  const SidebarGroup = ({
    group,
    onClickMobile
  }) => {
    const isChildActive = group.items.some((item) => item.path === location.pathname);
    const [isOpen, setIsOpen] = useState(isChildActive);
    if (!group.icon) {
      return /* @__PURE__ */ jsxs("div", {
        className: "mb-4",
        children: [/* @__PURE__ */ jsx("div", {
          className: "px-4 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider",
          children: group.label
        }), /* @__PURE__ */ jsx("div", {
          className: "space-y-1 px-2",
          children: group.items.map((item) => /* @__PURE__ */ jsx(SidebarMenuItem, {
            item,
            onClick: onClickMobile
          }, item.path))
        })]
      });
    }
    return /* @__PURE__ */ jsxs(Collapsible, {
      open: isOpen,
      onOpenChange: setIsOpen,
      className: "mb-2",
      children: [/* @__PURE__ */ jsxs(CollapsibleTrigger, {
        className: "flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-orange-600 rounded-md transition-colors group",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "flex items-center gap-3",
          children: [/* @__PURE__ */ jsx(group.icon, {
            size: 18,
            className: "text-slate-500 group-hover:text-orange-600"
          }), group.label]
        }), isOpen ? /* @__PURE__ */ jsx(ChevronDown, {
          size: 14
        }) : /* @__PURE__ */ jsx(ChevronRight, {
          size: 14
        })]
      }), /* @__PURE__ */ jsx(CollapsibleContent, {
        className: "space-y-1 mt-1 px-2 animate-in slide-in-from-top-2 duration-200",
        children: group.items.map((item) => /* @__PURE__ */ jsx(SidebarMenuItem, {
          item,
          onClick: onClickMobile
        }, item.path))
      })]
    });
  };
  const UserDropdown = () => /* @__PURE__ */ jsxs(DropdownMenu, {
    children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
      asChild: true,
      children: /* @__PURE__ */ jsxs(Avatar, {
        className: "cursor-pointer hover:opacity-80 transition-opacity",
        children: [/* @__PURE__ */ jsx(AvatarImage, {
          src: "https://github.com/shadcn.png"
        }), /* @__PURE__ */ jsx(AvatarFallback, {
          children: "AD"
        })]
      })
    }), /* @__PURE__ */ jsxs(DropdownMenuContent, {
      align: "end",
      className: "w-60",
      children: [/* @__PURE__ */ jsx(DropdownMenuLabel, {
        children: "My Account"
      }), /* @__PURE__ */ jsx(DropdownMenuSeparator, {}), /* @__PURE__ */ jsxs("div", {
        className: "flex items-center justify-between px-2 py-2 select-none",
        children: [/* @__PURE__ */ jsx("div", {
          className: "flex flex-col space-y-0.5",
          children: /* @__PURE__ */ jsx("span", {
            className: "text-sm font-medium",
            children: "Switch Layout"
          })
        }), /* @__PURE__ */ jsx(Switch, {
          checked: menuPosition === "top",
          onCheckedChange: toggleMenuPosition
        })]
      }), /* @__PURE__ */ jsx(DropdownMenuSeparator, {}), /* @__PURE__ */ jsxs(DropdownMenuItem, {
        onClick: handleLogout,
        className: "text-red-600 focus:text-red-600 gap-2 cursor-pointer",
        children: [/* @__PURE__ */ jsx(LogOut, {
          size: 16
        }), " Logout"]
      })]
    })]
  });
  const TopNavigation = () => /* @__PURE__ */ jsx("div", {
    className: "flex items-center space-x-2",
    children: /* @__PURE__ */ jsx(Menubar, {
      className: "border-none shadow-none bg-transparent",
      children: menuGroups.map((group, idx) => /* @__PURE__ */ jsxs(MenubarMenu, {
        children: [/* @__PURE__ */ jsx(MenubarTrigger, {
          className: "font-medium text-slate-600 hover:text-orange-600 hover:bg-orange-50 cursor-pointer data-[state=open]:bg-orange-50 data-[state=open]:text-orange-700",
          children: group.label
        }), /* @__PURE__ */ jsx(MenubarContent, {
          children: group.items.map((item) => /* @__PURE__ */ jsxs(MenubarItem, {
            onClick: () => navigate(item.path),
            className: "gap-2 cursor-pointer",
            children: [item.icon && /* @__PURE__ */ jsx(item.icon, {
              size: 14,
              className: "text-slate-500"
            }), item.label]
          }, item.path))
        })]
      }, idx))
    })
  });
  const renderSidebar = (isMobile = false) => /* @__PURE__ */ jsxs("div", {
    className: "flex flex-col h-full bg-white text-slate-900 border-r",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "p-6 flex items-center gap-2 border-b h-16",
      children: [/* @__PURE__ */ jsx("div", {
        className: "h-8 w-8 bg-orange-600 rounded-md flex items-center justify-center text-white font-bold shadow-sm",
        children: "S"
      }), /* @__PURE__ */ jsxs("span", {
        className: "font-bold text-xl tracking-tight text-slate-900",
        children: ["SCAFF", /* @__PURE__ */ jsx("span", {
          className: "text-orange-600",
          children: "RENT"
        })]
      })]
    }), /* @__PURE__ */ jsx("div", {
      className: "flex-1 overflow-y-auto py-6 space-y-2",
      children: menuGroups.map((group, idx) => /* @__PURE__ */ jsx(SidebarGroup, {
        group,
        onClickMobile: isMobile ? () => setIsMobileOpen(false) : void 0
      }, idx))
    }), menuPosition === "left" || isMobile ? /* @__PURE__ */ jsx("div", {
      className: "p-4 border-t bg-slate-50",
      children: /* @__PURE__ */ jsxs("div", {
        onClick: handleLogout,
        className: "flex items-center gap-3 px-3 py-2 text-slate-500 cursor-pointer hover:bg-red-100 hover:text-red-700 rounded-md transition-colors",
        children: [/* @__PURE__ */ jsx(LogOut, {
          size: 18
        }), " ", /* @__PURE__ */ jsx("span", {
          className: "text-sm font-medium",
          children: "Log Out"
        })]
      })
    }) : null]
  });
  return /* @__PURE__ */ jsxs("div", {
    className: "flex h-screen bg-slate-50/50",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b z-50 flex items-center px-4 justify-between shadow-sm",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "flex items-center gap-2",
        children: [/* @__PURE__ */ jsxs(Sheet, {
          open: isMobileOpen,
          onOpenChange: setIsMobileOpen,
          children: [/* @__PURE__ */ jsx(SheetTrigger, {
            asChild: true,
            children: /* @__PURE__ */ jsx(Button, {
              variant: "ghost",
              size: "icon",
              className: "md:hidden",
              children: /* @__PURE__ */ jsx(Menu, {
                className: "h-6 w-6 text-slate-700"
              })
            })
          }), /* @__PURE__ */ jsxs(SheetContent, {
            side: "left",
            className: "p-0 w-64 border-r-0",
            children: [/* @__PURE__ */ jsx(SheetTitle, {
              className: "sr-only",
              children: "Navigation"
            }), /* @__PURE__ */ jsx(SheetDescription, {
              className: "sr-only",
              children: "Main Menu"
            }), renderSidebar(true)]
          })]
        }), /* @__PURE__ */ jsxs("span", {
          className: "font-bold text-lg tracking-tight",
          children: ["SCAFF", /* @__PURE__ */ jsx("span", {
            className: "text-orange-600",
            children: "RENT"
          })]
        })]
      }), /* @__PURE__ */ jsx(UserDropdown, {})]
    }), menuPosition === "left" && /* @__PURE__ */ jsx("aside", {
      className: "hidden md:flex w-64 fixed left-0 top-0 bottom-0 z-40 shadow-sm transition-all duration-400",
      children: renderSidebar()
    }), /* @__PURE__ */ jsxs("div", {
      className: cn("flex-1 flex flex-col min-w-0 transition-all duration-400 h-screen", menuPosition === "left" ? "md:pl-64" : ""),
      children: [/* @__PURE__ */ jsxs("header", {
        className: "hidden md:flex h-16 border-b bg-white items-center justify-between px-8 sticky top-0 z-30 shadow-sm",
        children: [menuPosition === "top" ? (
          // Top Nav Layout
          /* @__PURE__ */ jsxs("div", {
            className: "flex items-center gap-6 animate-in fade-in slide-in-from-top-1 duration-400",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "flex items-center gap-2",
              children: [/* @__PURE__ */ jsx("div", {
                className: "h-8 w-8 bg-orange-600 rounded-md flex items-center justify-center text-white font-bold shadow-sm",
                children: "S"
              }), /* @__PURE__ */ jsxs("span", {
                className: "font-bold text-xl tracking-tight text-slate-900",
                children: ["SCAFF", /* @__PURE__ */ jsx("span", {
                  className: "text-orange-600",
                  children: "RENT"
                })]
              })]
            }), /* @__PURE__ */ jsx("div", {
              className: "h-6 w-px bg-slate-200 mx-2"
            }), /* @__PURE__ */ jsx(TopNavigation, {})]
          })
        ) : (
          // Left Sidebar Header Layout
          /* @__PURE__ */ jsx("h1", {
            className: "font-semibold text-lg text-slate-800 animate-in fade-in slide-in-from-left-1 duration-400",
            children: "Workspace"
          })
        ), /* @__PURE__ */ jsxs("div", {
          className: "flex items-center gap-4",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "text-right",
            children: [/* @__PURE__ */ jsx("p", {
              className: "text-sm font-medium text-slate-900",
              children: "Admin User"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-xs text-muted-foreground",
              children: "Owner"
            })]
          }), /* @__PURE__ */ jsx(UserDropdown, {})]
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "flex-1 overflow-auto p-4 md:p-8 pt-20 md:pt-8 pb-20 md:pb-8 animate-in fade-in slide-in-from-bottom-3 duration-400 ease-out",
        children: /* @__PURE__ */ jsx(Outlet, {})
      }, location.pathname)]
    }), /* @__PURE__ */ jsx(Toaster, {
      position: "top-right",
      richColors: true
    })]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: dashboardLayout
}, Symbol.toStringTag, { value: "Module" }));
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-header",
      className: cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      ),
      ...props
    }
  );
}
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-title",
      className: cn("leading-none font-semibold", className),
      ...props
    }
  );
}
function CardDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    }
  );
}
function CardFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-footer",
      className: cn("flex items-center px-6 [.border-t]:pt-6", className),
      ...props
    }
  );
}
const BentoGrid = ({
  className,
  children
}) => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "grid md:auto-rows-[10rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
        className
      ),
      children
    }
  );
};
const BentoItem = ({
  className,
  children
}) => {
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      whileHover: { scale: 1.01 },
      transition: { duration: 0.2 },
      className: cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 bg-white border border-slate-200 justify-between flex flex-col space-y-4",
        className
      ),
      children
    }
  );
};
function meta$q({}) {
  return [{
    title: "Dashboard - ScaffRent"
  }];
}
const COLORS = ["#ea580c", "#334155", "#94a3b8", "#fb923c", "#475569"];
const home = UNSAFE_withComponentProps(function Home() {
  const [data, setData] = useState({
    counts: {
      revenue: 0,
      rentals: 0,
      customers: 0,
      stockValue: 0
    },
    charts: {
      pie: [],
      line: []
    },
    recentActivity: []
  });
  const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("/api/dashboard/stats", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (res.ok) setData(await res.json());
    } catch (e) {
      console.error("Stats error");
    }
  };
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15e3);
    return () => clearInterval(interval);
  }, []);
  const formatCurrency = (val) => new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(val);
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6 animate-in fade-in duration-500 pb-10",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "flex flex-col md:flex-row md:items-center justify-between gap-4",
      children: [/* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-2xl md:text-3xl font-bold tracking-tight text-slate-900",
          children: "Dashboard"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-sm md:text-base text-slate-500",
          children: "Real-time overview of business performance."
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "flex items-center gap-2 text-xs bg-white px-3 py-1 rounded-full border shadow-sm text-green-600",
        children: [/* @__PURE__ */ jsxs("span", {
          className: "relative flex h-2 w-2",
          children: [/* @__PURE__ */ jsx("span", {
            className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
          }), /* @__PURE__ */ jsx("span", {
            className: "relative inline-flex rounded-full h-2 w-2 bg-green-500"
          })]
        }), "Live Data Updates"]
      })]
    }), /* @__PURE__ */ jsxs(BentoGrid, {
      className: "max-w-full",
      children: [/* @__PURE__ */ jsxs(BentoItem, {
        className: "md:col-span-2 border-orange-200 bg-orange-50/30",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "flex flex-row items-center justify-between",
          children: [/* @__PURE__ */ jsx("div", {
            className: "p-2 bg-orange-100 rounded-lg text-orange-600",
            children: /* @__PURE__ */ jsx(Wallet, {
              size: 24
            })
          }), /* @__PURE__ */ jsx("span", {
            className: "text-xs font-bold bg-orange-100 text-orange-700 px-2 py-1 rounded",
            children: "FINANCIALS"
          })]
        }), /* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("div", {
            className: "text-3xl font-bold text-slate-900",
            children: formatCurrency(data.counts.revenue)
          }), /* @__PURE__ */ jsx("p", {
            className: "text-sm text-slate-500 mt-1",
            children: "Total Revenue (Sales & Rentals)"
          })]
        })]
      }), /* @__PURE__ */ jsxs(BentoItem, {
        className: "md:col-span-1",
        children: [/* @__PURE__ */ jsx("div", {
          className: "flex flex-row items-center justify-between",
          children: /* @__PURE__ */ jsx("div", {
            className: "p-2 bg-green-100 rounded-lg text-green-600",
            children: /* @__PURE__ */ jsx(ShoppingCart, {
              size: 24
            })
          })
        }), /* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("div", {
            className: "text-3xl font-bold text-slate-900",
            children: data.counts.rentals
          }), /* @__PURE__ */ jsx("p", {
            className: "text-sm text-slate-500 mt-1",
            children: "Active Rental Orders"
          })]
        })]
      }), /* @__PURE__ */ jsxs(BentoItem, {
        className: "md:col-span-1",
        children: [/* @__PURE__ */ jsx("div", {
          className: "flex flex-row items-center justify-between",
          children: /* @__PURE__ */ jsx("div", {
            className: "p-2 bg-blue-100 rounded-lg text-blue-600",
            children: /* @__PURE__ */ jsx(Box, {
              size: 24
            })
          })
        }), /* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("div", {
            className: "text-2xl font-bold text-slate-900",
            children: formatCurrency(data.counts.stockValue)
          }), /* @__PURE__ */ jsx("p", {
            className: "text-sm text-slate-500 mt-1",
            children: "Inventory Asset Valuation"
          })]
        })]
      }), /* @__PURE__ */ jsx(BentoItem, {
        className: "md:col-span-2",
        children: /* @__PURE__ */ jsxs("div", {
          className: "flex justify-between items-start",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "space-y-4",
            children: [/* @__PURE__ */ jsx("div", {
              className: "p-2 bg-purple-100 w-fit rounded-lg text-purple-600",
              children: /* @__PURE__ */ jsx(Users, {
                size: 24
              })
            }), /* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("div", {
                className: "text-3xl font-bold text-slate-900",
                children: data.counts.customers
              }), /* @__PURE__ */ jsx("p", {
                className: "text-sm text-slate-500",
                children: "Registered Clients"
              })]
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "hidden md:block h-16 w-32 bg-purple-50 rounded-lg border border-purple-100 flex items-center justify-center",
            children: /* @__PURE__ */ jsx(Activity, {
              className: "text-purple-300"
            })
          })]
        })
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "grid gap-4 grid-cols-1 lg:grid-cols-7",
      children: [/* @__PURE__ */ jsxs(Card, {
        className: "col-span-1 lg:col-span-4 shadow-sm hover:shadow-md transition-shadow",
        children: [/* @__PURE__ */ jsxs(CardHeader, {
          children: [/* @__PURE__ */ jsx(CardTitle, {
            children: "Revenue Trend"
          }), /* @__PURE__ */ jsx(CardDescription, {
            children: "Monthly financial performance (Last 6 Months)."
          })]
        }), /* @__PURE__ */ jsx(CardContent, {
          className: "pl-0 md:pl-2",
          children: /* @__PURE__ */ jsx("div", {
            className: "h-[250px] md:h-[300px] w-full",
            children: data.charts.line && data.charts.line.length > 0 ? /* @__PURE__ */ jsx(ResponsiveContainer, {
              width: "100%",
              height: "100%",
              children: /* @__PURE__ */ jsxs(AreaChart, {
                data: data.charts.line,
                children: [/* @__PURE__ */ jsx("defs", {
                  children: /* @__PURE__ */ jsxs("linearGradient", {
                    id: "colorTotal",
                    x1: "0",
                    y1: "0",
                    x2: "0",
                    y2: "1",
                    children: [/* @__PURE__ */ jsx("stop", {
                      offset: "5%",
                      stopColor: "#ea580c",
                      stopOpacity: 0.8
                    }), /* @__PURE__ */ jsx("stop", {
                      offset: "95%",
                      stopColor: "#ea580c",
                      stopOpacity: 0
                    })]
                  })
                }), /* @__PURE__ */ jsx(CartesianGrid, {
                  strokeDasharray: "3 3",
                  vertical: false,
                  stroke: "#e2e8f0"
                }), /* @__PURE__ */ jsx(XAxis, {
                  dataKey: "name",
                  stroke: "#64748b",
                  fontSize: 12,
                  tickLine: false,
                  axisLine: false
                }), /* @__PURE__ */ jsx(YAxis, {
                  stroke: "#64748b",
                  fontSize: 12,
                  tickLine: false,
                  axisLine: false,
                  tickFormatter: (val) => `₹${val / 1e3}k`
                }), /* @__PURE__ */ jsx(Tooltip, {
                  contentStyle: {
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0"
                  },
                  itemStyle: {
                    color: "#ea580c"
                  },
                  formatter: (value) => [formatCurrency(value ?? 0), "Revenue"]
                }), /* @__PURE__ */ jsx(Area, {
                  type: "monotone",
                  dataKey: "value",
                  stroke: "#ea580c",
                  strokeWidth: 2,
                  fillOpacity: 1,
                  fill: "url(#colorTotal)"
                })]
              })
            }) : /* @__PURE__ */ jsxs("div", {
              className: "h-full flex flex-col items-center justify-center text-slate-400 border-2 border-dashed rounded-lg bg-slate-50",
              children: [/* @__PURE__ */ jsx(Activity, {
                className: "h-10 w-10 mb-2 opacity-20"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-sm",
                children: "No sales data recorded yet."
              })]
            })
          })
        })]
      }), /* @__PURE__ */ jsxs(Card, {
        className: "col-span-1 lg:col-span-3 shadow-sm hover:shadow-md transition-shadow",
        children: [/* @__PURE__ */ jsxs(CardHeader, {
          children: [/* @__PURE__ */ jsx(CardTitle, {
            children: "Inventory Distribution"
          }), /* @__PURE__ */ jsx(CardDescription, {
            children: "Stock breakdown by Item Group."
          })]
        }), /* @__PURE__ */ jsx(CardContent, {
          children: /* @__PURE__ */ jsx("div", {
            className: "h-[250px] md:h-[300px] w-full",
            children: data.charts.pie && data.charts.pie.length > 0 ? /* @__PURE__ */ jsx(ResponsiveContainer, {
              width: "100%",
              height: "100%",
              children: /* @__PURE__ */ jsxs(PieChart, {
                children: [/* @__PURE__ */ jsx(Pie, {
                  data: data.charts.pie,
                  cx: "50%",
                  cy: "50%",
                  innerRadius: 60,
                  outerRadius: 80,
                  paddingAngle: 5,
                  dataKey: "value",
                  children: data.charts.pie.map((entry2, index) => /* @__PURE__ */ jsx(Cell, {
                    fill: COLORS[index % COLORS.length]
                  }, `cell-${index}`))
                }), /* @__PURE__ */ jsx(Tooltip, {
                  formatter: (value) => [value, "Items"]
                }), /* @__PURE__ */ jsx(Legend, {
                  verticalAlign: "bottom",
                  height: 36
                })]
              })
            }) : /* @__PURE__ */ jsxs("div", {
              className: "h-full flex flex-col items-center justify-center text-slate-400 border-2 border-dashed rounded-lg bg-slate-50",
              children: [/* @__PURE__ */ jsx(Package, {
                className: "h-10 w-10 mb-2 opacity-20"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-sm",
                children: "Add Items & Groups to see analysis."
              })]
            })
          })
        })]
      })]
    }), /* @__PURE__ */ jsxs(Card, {
      className: "shadow-sm hover:shadow-md transition-shadow",
      children: [/* @__PURE__ */ jsxs(CardHeader, {
        children: [/* @__PURE__ */ jsx(CardTitle, {
          children: "Recent Logistics"
        }), /* @__PURE__ */ jsx(CardDescription, {
          children: "Latest material movements (Inward/Outward)."
        })]
      }), /* @__PURE__ */ jsx(CardContent, {
        children: /* @__PURE__ */ jsx("div", {
          className: "space-y-6",
          children: data.recentActivity && data.recentActivity.length > 0 ? data.recentActivity.map((item) => /* @__PURE__ */ jsxs("div", {
            className: "flex items-center group cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition-colors",
            children: [/* @__PURE__ */ jsx(Avatar, {
              className: "h-9 w-9 bg-slate-100 border hidden sm:block group-hover:scale-110 transition-transform",
              children: /* @__PURE__ */ jsx(AvatarFallback, {
                className: item.type === "Delivery" ? "text-orange-600" : "text-green-600",
                children: item.type === "Delivery" ? /* @__PURE__ */ jsx(ArrowUpRight, {
                  size: 16
                }) : /* @__PURE__ */ jsx(ArrowDownRight, {
                  size: 16
                })
              })
            }), /* @__PURE__ */ jsxs("div", {
              className: "ml-0 sm:ml-4 space-y-1 flex-1",
              children: [/* @__PURE__ */ jsx("p", {
                className: "text-sm font-medium leading-none group-hover:text-orange-600 transition-colors",
                children: item.title
              }), /* @__PURE__ */ jsxs("p", {
                className: "text-xs text-muted-foreground flex items-center gap-1",
                children: [item.subtitle, " • ", /* @__PURE__ */ jsx("span", {
                  className: "font-mono text-[10px] bg-slate-100 px-1 rounded",
                  children: new Date(item.date).toLocaleDateString()
                })]
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "text-right",
              children: [/* @__PURE__ */ jsx("span", {
                className: "block font-bold text-sm text-slate-700",
                children: item.amount
              }), /* @__PURE__ */ jsx("span", {
                className: "text-[10px] text-slate-400 uppercase tracking-wider",
                children: item.type
              })]
            })]
          }, item.id)) : /* @__PURE__ */ jsx("div", {
            className: "text-center py-8 text-slate-500 text-sm",
            children: "No recent logistics activity found."
          })
        })
      })]
    })]
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta: meta$q
}, Symbol.toStringTag, { value: "Module" }));
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    LabelPrimitive.Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
const validatePAN = (pan) => {
  const regex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return regex.test(pan);
};
const validateGSTN = (gstin) => {
  if (gstin.length !== 15) return false;
  const regex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  if (!regex.test(gstin)) return false;
  const stateCode = parseInt(gstin.substring(0, 2), 10);
  if (stateCode < 1 || stateCode > 37) {
    return false;
  }
  return validateGSTNChecksum(gstin);
};
const validateGSTNChecksum = (gstin) => {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const inputChars = gstin.toUpperCase();
  const targetCheckDigit = inputChars[14];
  const payload = inputChars.substring(0, 14);
  let totalSum = 0;
  for (let i = 0; i < 14; i++) {
    const char = payload[i];
    const value = chars.indexOf(char);
    const factor = i % 2 === 0 ? 1 : 2;
    let product = value * factor;
    const quotient = Math.floor(product / 36);
    const remainder2 = product % 36;
    const result = quotient + remainder2;
    totalSum += result;
  }
  const remainder = totalSum % 36;
  const checkValue = (36 - remainder) % 36;
  const generatedCheckDigit = chars[checkValue];
  return targetCheckDigit === generatedCheckDigit;
};
const validateHSN = (hsn) => {
  if (!/^\d+$/.test(hsn)) return false;
  if (![2, 4, 6, 8].includes(hsn.length)) return false;
  const chapter = parseInt(hsn.substring(0, 2), 10);
  if (chapter < 1 || chapter > 98) return false;
  if (hsn.length >= 4) {
    const headingSuffix = hsn.substring(2, 4);
    if (headingSuffix === "00") return false;
  }
  if (hsn.length >= 6) {
    const subHeadingSuffix = hsn.substring(2, 6);
    if (subHeadingSuffix === "0000") return false;
  }
  if (hsn.length === 8) {
    if (hsn === "00000000") return false;
  }
  return true;
};
function meta$p({}) {
  return [{
    title: "Company Profile - ScaffRent"
  }];
}
const companySchema = z.object({
  name: z.string().min(2, "Company name is required"),
  email: z.string().email(),
  mobile: z.string().min(10, "Valid mobile required"),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  // PAN Validation
  pan: z.string().toUpperCase().refine((val) => !val || validatePAN(val), {
    message: "Invalid PAN Format (e.g., ABCDE1234F)"
  }),
  // GSTN Validation
  gstn: z.string().toUpperCase().refine((val) => !val || validateGSTN(val), {
    message: "Invalid GSTN (Check State Code or Checksum)"
  })
});
const company = UNSAFE_withComponentProps(function CompanyProfile() {
  const {
    register: register2,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: {
      errors,
      isSubmitting
    }
  } = useForm({
    resolver: zodResolver(companySchema)
  });
  const watchedData = watch();
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch("/api/company", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (data && data.name) {
          reset(data);
        }
      } catch (err) {
        console.error("Failed to fetch profile");
      }
    };
    fetchProfile();
  }, [reset]);
  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("/api/company", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        toast.success("Profile Updated Successfully");
      } else {
        toast.error("Update Failed");
      }
    } catch (err) {
      toast.error("Server Error");
    }
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "max-w-5xl mx-auto space-y-6",
    children: [/* @__PURE__ */ jsxs("div", {
      children: [/* @__PURE__ */ jsx("h2", {
        className: "text-2xl font-bold tracking-tight",
        children: "Company Setup"
      }), /* @__PURE__ */ jsx("p", {
        className: "text-muted-foreground",
        children: "Manage your billing and organization details."
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "grid grid-cols-1 md:grid-cols-3 gap-6",
      children: [/* @__PURE__ */ jsxs(Card, {
        className: "md:col-span-2",
        children: [/* @__PURE__ */ jsxs(CardHeader, {
          children: [/* @__PURE__ */ jsx(CardTitle, {
            children: "Organization Details"
          }), /* @__PURE__ */ jsx(CardDescription, {
            children: "This information will appear on your invoices."
          })]
        }), /* @__PURE__ */ jsx(CardContent, {
          children: /* @__PURE__ */ jsxs("form", {
            onSubmit: handleSubmit(onSubmit),
            className: "space-y-4",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "grid grid-cols-2 gap-4",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "col-span-2",
                children: [/* @__PURE__ */ jsx(Label, {
                  children: "Company Name"
                }), /* @__PURE__ */ jsx(Input, {
                  ...register2("name"),
                  placeholder: "Enter legal name"
                }), errors.name && /* @__PURE__ */ jsx("span", {
                  className: "text-red-500 text-xs",
                  children: errors.name.message
                })]
              }), /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx(Label, {
                  children: "Email"
                }), /* @__PURE__ */ jsx(Input, {
                  ...register2("email")
                }), errors.email && /* @__PURE__ */ jsx("span", {
                  className: "text-red-500 text-xs",
                  children: errors.email.message
                })]
              }), /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx(Label, {
                  children: "Mobile"
                }), /* @__PURE__ */ jsx(Input, {
                  ...register2("mobile")
                }), errors.mobile && /* @__PURE__ */ jsx("span", {
                  className: "text-red-500 text-xs",
                  children: errors.mobile.message
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "col-span-2",
                children: [/* @__PURE__ */ jsx(Label, {
                  children: "Billing Address"
                }), /* @__PURE__ */ jsx(Input, {
                  ...register2("address")
                })]
              }), /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx(Label, {
                  children: "City"
                }), /* @__PURE__ */ jsx(Input, {
                  ...register2("city")
                })]
              }), /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx(Label, {
                  children: "State"
                }), /* @__PURE__ */ jsx(Input, {
                  ...register2("state")
                })]
              }), /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx(Label, {
                  children: "GSTN No"
                }), /* @__PURE__ */ jsx(Input, {
                  ...register2("gstn"),
                  className: "uppercase",
                  maxLength: 15,
                  placeholder: "27ABCDE1234F1Z5",
                  onChange: (e) => {
                    setValue("gstn", e.target.value.toUpperCase(), {
                      shouldValidate: true
                    });
                  }
                }), errors.gstn && /* @__PURE__ */ jsx("span", {
                  className: "text-red-500 text-xs",
                  children: errors.gstn.message
                })]
              }), /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx(Label, {
                  children: "PAN No"
                }), /* @__PURE__ */ jsx(Input, {
                  ...register2("pan"),
                  className: "uppercase",
                  maxLength: 10,
                  placeholder: "ABCDE1234F",
                  onChange: (e) => {
                    setValue("pan", e.target.value.toUpperCase(), {
                      shouldValidate: true
                    });
                  }
                }), errors.pan && /* @__PURE__ */ jsx("span", {
                  className: "text-red-500 text-xs",
                  children: errors.pan.message
                })]
              })]
            }), /* @__PURE__ */ jsx("div", {
              className: "flex justify-end pt-4",
              children: /* @__PURE__ */ jsx(Button, {
                type: "submit",
                className: "hover-card-glow bg-orange-600 hover:bg-orange-700",
                disabled: isSubmitting,
                children: isSubmitting ? "Saving..." : "Save Changes"
              })
            })]
          })
        })]
      }), /* @__PURE__ */ jsxs(Card, {
        className: "hover-card-glow bg-slate-900 text-white h-fit border-slate-800",
        children: [/* @__PURE__ */ jsx(CardHeader, {
          children: /* @__PURE__ */ jsx(CardTitle, {
            className: "text-white",
            children: "Preview"
          })
        }), /* @__PURE__ */ jsxs(CardContent, {
          className: "space-y-4",
          children: [/* @__PURE__ */ jsx("div", {
            className: "h-16 w-16 bg-orange-500 rounded-lg flex items-center justify-center text-2xl font-bold text-white",
            children: watchedData.name ? watchedData.name.charAt(0) : "C"
          }), /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("p", {
              className: "font-medium text-lg",
              children: watchedData.name || "Company Name"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-slate-400 text-sm",
              children: watchedData.email || "email@company.com"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "text-xs text-slate-500 border-t border-slate-700 pt-4 space-y-1",
            children: [/* @__PURE__ */ jsxs("p", {
              children: ["GSTN: ", watchedData.gstn || "-"]
            }), /* @__PURE__ */ jsxs("p", {
              children: ["PAN: ", watchedData.pan || "-"]
            }), /* @__PURE__ */ jsxs("p", {
              children: [watchedData.city || "City", ", ", watchedData.state || "State"]
            })]
          })]
        })]
      })]
    })]
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: company,
  meta: meta$p
}, Symbol.toStringTag, { value: "Module" }));
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsx(SheetPrimitive.Root, { "data-slot": "dialog", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx(SheetPrimitive.Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SheetPrimitive.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxs(
      SheetPrimitive.Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 outline-none sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxs(
            SheetPrimitive.Close,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsx(XIcon, {}),
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SheetPrimitive.Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
function Select({
  ...props
}) {
  return /* @__PURE__ */ jsx(SelectPrimitive.Root, { "data-slot": "select", ...props });
}
function SelectValue({
  ...props
}) {
  return /* @__PURE__ */ jsx(SelectPrimitive.Value, { "data-slot": "select-value", ...props });
}
function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    SelectPrimitive.Trigger,
    {
      "data-slot": "select-trigger",
      "data-size": size,
      className: cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDownIcon, { className: "size-4 opacity-50" }) })
      ]
    }
  );
}
function SelectContent({
  className,
  children,
  position = "item-aligned",
  align = "center",
  ...props
}) {
  return /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
    SelectPrimitive.Content,
    {
      "data-slot": "select-content",
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
        position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      ),
      position,
      align,
      ...props,
      children: [
        /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
        /* @__PURE__ */ jsx(
          SelectPrimitive.Viewport,
          {
            className: cn(
              "p-1",
              position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
            ),
            children
          }
        ),
        /* @__PURE__ */ jsx(SelectScrollDownButton, {})
      ]
    }
  ) });
}
function SelectItem({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    SelectPrimitive.Item,
    {
      "data-slot": "select-item",
      className: cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            "data-slot": "select-item-indicator",
            className: "absolute right-2 flex size-3.5 items-center justify-center",
            children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(CheckIcon, { className: "size-4" }) })
          }
        ),
        /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
      ]
    }
  );
}
function SelectScrollUpButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SelectPrimitive.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(ChevronUpIcon, { className: "size-4" })
    }
  );
}
function SelectScrollDownButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SelectPrimitive.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(ChevronDownIcon, { className: "size-4" })
    }
  );
}
const Tabs = TabsPrimitive.Root;
const TabsList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.List,
  {
    ref,
    className: cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = TabsPrimitive.List.displayName;
const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
const TabsContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
function meta$o({}) {
  return [{
    title: "Customers - ScaffRent"
  }];
}
const customerSchema = z.object({
  name: z.string().min(2, "Company Name is required"),
  // Contact Person
  contactPerson: z.string().min(2, "Contact Person Name is required"),
  mob1: z.string().min(10, "Mobile 1 is required"),
  mob2: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  // Addresses
  billingAddress: z.string().optional(),
  billingState: z.string().optional(),
  shippingAddress: z.string().optional(),
  shippingState: z.string().optional(),
  // Tax & Currency
  gstn: z.string().toUpperCase().optional().or(z.literal("")).refine((val) => !val || validateGSTN(val), {
    message: "Invalid GSTN Checksum"
  }),
  pan: z.string().toUpperCase().optional().or(z.literal("")).refine((val) => !val || validatePAN(val), {
    message: "Invalid PAN Format"
  }),
  currency: z.string().optional()
});
const customers = UNSAFE_withComponentProps(function Customers() {
  const [customers2, setCustomers] = useState([]);
  const [currencies2, setCurrencies] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const {
    register: register2,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: {
      errors
    }
  } = useForm({
    resolver: zodResolver(customerSchema)
  });
  const fetchMasters = async () => {
    const token = localStorage.getItem("token");
    const headers = {
      "Authorization": `Bearer ${token}`
    };
    try {
      const [custRes, curRes] = await Promise.all([fetch("/api/masters/customers", {
        headers
      }), fetch("/api/masters/currencies", {
        headers
      })]);
      if (custRes.ok) setCustomers(await custRes.json());
      if (curRes.ok) setCurrencies(await curRes.json());
    } catch (e) {
      console.error("Error fetching data");
    }
  };
  useEffect(() => {
    fetchMasters();
  }, []);
  const handleEdit = (cust, e) => {
    e.stopPropagation();
    setEditingId(cust._id);
    setValue("name", cust.name);
    setValue("contactPerson", cust.contactPerson);
    setValue("mob1", cust.mob1);
    setValue("mob2", cust.mob2);
    setValue("email", cust.email);
    setValue("currency", cust.currency?._id || "");
    setValue("billingAddress", cust.billingAddress);
    setValue("billingState", cust.billingState);
    setValue("shippingAddress", cust.shippingAddress);
    setValue("shippingState", cust.shippingState);
    setValue("gstn", cust.gstn);
    setValue("pan", cust.pan);
    setIsOpen(true);
  };
  const handleAddNew = () => {
    setEditingId(null);
    reset({
      name: "",
      contactPerson: "",
      mob1: "",
      mob2: "",
      email: "",
      billingAddress: "",
      billingState: "",
      shippingAddress: "",
      shippingState: "",
      gstn: "",
      pan: "",
      currency: ""
    });
    setIsOpen(true);
  };
  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    const url = editingId ? `/api/masters/customers/${editingId}` : "/api/masters/customers";
    const method = editingId ? "PUT" : "POST";
    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        toast.success(editingId ? "Customer Updated" : "Customer Created");
        setIsOpen(false);
        fetchMasters();
      } else {
        toast.error("Operation Failed");
      }
    } catch (e) {
      toast.error("Server Error");
    }
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "flex justify-between items-center",
      children: [/* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-2xl font-bold",
          children: "Customers"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-muted-foreground",
          children: "Manage clients."
        })]
      }), /* @__PURE__ */ jsxs(Button, {
        onClick: handleAddNew,
        className: "hover-card-glow bg-orange-600 hover:bg-orange-700",
        children: [/* @__PURE__ */ jsx(Plus, {
          className: "mr-2 h-4 w-4"
        }), " Add Customer"]
      })]
    }), /* @__PURE__ */ jsx(Dialog, {
      open: isOpen,
      onOpenChange: setIsOpen,
      children: /* @__PURE__ */ jsxs(DialogContent, {
        className: "sm:max-w-[650px] max-h-[90vh] overflow-y-auto",
        children: [/* @__PURE__ */ jsx(DialogHeader, {
          children: /* @__PURE__ */ jsxs(DialogTitle, {
            children: [editingId ? "Edit" : "Add", " Customer"]
          })
        }), /* @__PURE__ */ jsxs("form", {
          onSubmit: handleSubmit(onSubmit),
          className: "space-y-4 py-2",
          children: [/* @__PURE__ */ jsxs(Tabs, {
            defaultValue: "general",
            className: "w-full",
            children: [/* @__PURE__ */ jsxs(TabsList, {
              className: "grid w-full grid-cols-2",
              children: [/* @__PURE__ */ jsx(TabsTrigger, {
                value: "general",
                children: "General Info"
              }), /* @__PURE__ */ jsx(TabsTrigger, {
                value: "address",
                children: "Addresses & Tax"
              })]
            }), /* @__PURE__ */ jsxs(TabsContent, {
              value: "general",
              className: "space-y-4 mt-4",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "space-y-2",
                children: [/* @__PURE__ */ jsx(Label, {
                  children: "Company Name"
                }), /* @__PURE__ */ jsx(Input, {
                  ...register2("name"),
                  placeholder: "Client Company Name"
                }), errors.name && /* @__PURE__ */ jsx("span", {
                  className: "text-red-500 text-xs",
                  children: errors.name.message
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "grid grid-cols-2 gap-4",
                children: [/* @__PURE__ */ jsxs("div", {
                  className: "space-y-2",
                  children: [/* @__PURE__ */ jsx(Label, {
                    children: "Contact Person Name"
                  }), /* @__PURE__ */ jsx(Input, {
                    ...register2("contactPerson")
                  }), errors.contactPerson && /* @__PURE__ */ jsx("span", {
                    className: "text-red-500 text-xs",
                    children: errors.contactPerson.message
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  className: "space-y-2",
                  children: [/* @__PURE__ */ jsx(Label, {
                    children: "Email"
                  }), /* @__PURE__ */ jsx(Input, {
                    ...register2("email")
                  })]
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "grid grid-cols-2 gap-4",
                children: [/* @__PURE__ */ jsxs("div", {
                  className: "space-y-2",
                  children: [/* @__PURE__ */ jsx(Label, {
                    children: "Mobile 1"
                  }), /* @__PURE__ */ jsx(Input, {
                    ...register2("mob1"),
                    placeholder: "Required"
                  }), errors.mob1 && /* @__PURE__ */ jsx("span", {
                    className: "text-red-500 text-xs",
                    children: errors.mob1.message
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  className: "space-y-2",
                  children: [/* @__PURE__ */ jsx(Label, {
                    children: "Mobile 2"
                  }), /* @__PURE__ */ jsx(Input, {
                    ...register2("mob2"),
                    placeholder: "Optional"
                  })]
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "space-y-2",
                children: [/* @__PURE__ */ jsx(Label, {
                  children: "Currency"
                }), /* @__PURE__ */ jsx(Controller, {
                  name: "currency",
                  control,
                  render: ({
                    field
                  }) => /* @__PURE__ */ jsxs(Select, {
                    onValueChange: field.onChange,
                    value: field.value,
                    children: [/* @__PURE__ */ jsx(SelectTrigger, {
                      children: /* @__PURE__ */ jsx(SelectValue, {
                        placeholder: "Select Currency"
                      })
                    }), /* @__PURE__ */ jsx(SelectContent, {
                      children: currencies2.map((c) => /* @__PURE__ */ jsxs(SelectItem, {
                        value: c._id,
                        children: [c.code, " (", c.symbol, ")"]
                      }, c._id))
                    })]
                  })
                })]
              })]
            }), /* @__PURE__ */ jsxs(TabsContent, {
              value: "address",
              className: "space-y-4 mt-4",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "grid grid-cols-2 gap-4",
                children: [/* @__PURE__ */ jsxs("div", {
                  className: "space-y-2",
                  children: [/* @__PURE__ */ jsx(Label, {
                    children: "GSTN"
                  }), /* @__PURE__ */ jsx(Input, {
                    ...register2("gstn"),
                    className: "uppercase",
                    maxLength: 15,
                    onChange: (e) => setValue("gstn", e.target.value.toUpperCase(), {
                      shouldValidate: true
                    })
                  }), errors.gstn && /* @__PURE__ */ jsx("span", {
                    className: "text-red-500 text-xs",
                    children: errors.gstn.message
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  className: "space-y-2",
                  children: [/* @__PURE__ */ jsx(Label, {
                    children: "PAN"
                  }), /* @__PURE__ */ jsx(Input, {
                    ...register2("pan"),
                    className: "uppercase",
                    maxLength: 10,
                    onChange: (e) => setValue("pan", e.target.value.toUpperCase(), {
                      shouldValidate: true
                    })
                  }), errors.pan && /* @__PURE__ */ jsx("span", {
                    className: "text-red-500 text-xs",
                    children: errors.pan.message
                  })]
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "space-y-2 p-3 bg-slate-50 rounded-md border",
                children: [/* @__PURE__ */ jsxs(Label, {
                  className: "font-bold flex items-center gap-2",
                  children: [/* @__PURE__ */ jsx(CreditCard, {
                    className: "h-4 w-4 text-slate-500"
                  }), " Billing Details"]
                }), /* @__PURE__ */ jsxs("div", {
                  className: "grid grid-cols-3 gap-2 mt-1",
                  children: [/* @__PURE__ */ jsx("div", {
                    className: "col-span-2",
                    children: /* @__PURE__ */ jsx(Input, {
                      ...register2("billingAddress"),
                      placeholder: "Address"
                    })
                  }), /* @__PURE__ */ jsx("div", {
                    children: /* @__PURE__ */ jsx(Input, {
                      ...register2("billingState"),
                      placeholder: "State"
                    })
                  })]
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "space-y-2 p-3 bg-slate-50 rounded-md border",
                children: [/* @__PURE__ */ jsxs(Label, {
                  className: "font-bold flex items-center gap-2",
                  children: [/* @__PURE__ */ jsx(Truck, {
                    className: "h-4 w-4 text-slate-500"
                  }), " Shipping Details"]
                }), /* @__PURE__ */ jsxs("div", {
                  className: "grid grid-cols-3 gap-2 mt-1",
                  children: [/* @__PURE__ */ jsx("div", {
                    className: "col-span-2",
                    children: /* @__PURE__ */ jsx(Input, {
                      ...register2("shippingAddress"),
                      placeholder: "Address"
                    })
                  }), /* @__PURE__ */ jsx("div", {
                    children: /* @__PURE__ */ jsx(Input, {
                      ...register2("shippingState"),
                      placeholder: "State"
                    })
                  })]
                })]
              })]
            })]
          }), /* @__PURE__ */ jsx(DialogFooter, {
            children: /* @__PURE__ */ jsx(Button, {
              type: "submit",
              className: "hover-card-glow bg-orange-600 w-full",
              children: editingId ? "Update" : "Save"
            })
          })]
        })]
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "grid gap-10 md:grid-cols-4 lg:grid-cols-4",
      children: customers2.map((cust) => /* @__PURE__ */ jsx(Card, {
        className: "relative hover-card-glow hover:shadow-md transition-all group border-l-4 border-l-transparent hover:border-l-orange-500",
        children: /* @__PURE__ */ jsxs(CardContent, {
          className: "p-5",
          children: [/* @__PURE__ */ jsx(Button, {
            variant: "ghost",
            size: "icon",
            className: "absolute top-2 right-2 text-slate-400 hover:text-orange-600",
            onClick: (e) => handleEdit(cust, e),
            children: /* @__PURE__ */ jsx(Pencil, {
              className: "h-4 w-4"
            })
          }), /* @__PURE__ */ jsx("div", {
            className: "flex justify-between items-start",
            children: /* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("span", {
                className: "text-xs font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded-full",
                children: cust.code
              }), /* @__PURE__ */ jsx("h4", {
                className: "font-bold text-lg mt-3 group-hover:text-orange-600 transition-colors",
                children: cust.name
              })]
            })
          }), /* @__PURE__ */ jsxs("div", {
            className: "mt-4 space-y-2 text-sm text-muted-foreground",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "flex items-center gap-2",
              children: [/* @__PURE__ */ jsx(User, {
                className: "h-4 w-4"
              }), " ", cust.contactPerson]
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex items-center gap-2",
              children: [/* @__PURE__ */ jsx(Phone, {
                className: "h-4 w-4"
              }), " ", cust.mob1]
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex items-center gap-2",
              children: [/* @__PURE__ */ jsx(MapPin, {
                className: "h-4 w-4"
              }), " ", cust.billingState || "No State"]
            })]
          })]
        })
      }, cust._id))
    })]
  });
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: customers,
  meta: meta$o
}, Symbol.toStringTag, { value: "Module" }));
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}
function meta$n({}) {
  return [{
    title: "Sites - ScaffRent"
  }];
}
const siteSchema = z.object({
  customerId: z.string().min(1, "Select customer"),
  name: z.string().min(2, "Name required"),
  address: z.string().min(5, "Address required"),
  state: z.string().min(1, "Select state"),
  contactPerson: z.string().optional(),
  mob1: z.string().min(10, "Mobile required"),
  mob2: z.string().optional()
});
const sites = UNSAFE_withComponentProps(function Sites() {
  const [sites2, setSites] = useState([]);
  const [customers2, setCustomers] = useState([]);
  const [states2, setStates] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const {
    register: register2,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: {
      errors
    }
  } = useForm({
    resolver: zodResolver(siteSchema)
  });
  const fetchAll = async () => {
    const token = localStorage.getItem("token");
    const h = {
      "Authorization": `Bearer ${token}`
    };
    try {
      const [stRes, cRes, sRes] = await Promise.all([fetch("/api/masters/states", {
        headers: h
      }), fetch("/api/masters/customers", {
        headers: h
      }), fetch("/api/sites", {
        headers: h
      })]);
      if (stRes.ok) setStates(await stRes.json());
      if (cRes.ok) setCustomers(await cRes.json());
      if (sRes.ok) setSites(await sRes.json());
    } catch (e) {
      toast.error("Network Error");
    }
  };
  useEffect(() => {
    fetchAll();
  }, []);
  const handleEdit = (site) => {
    setEditingId(site._id);
    setValue("customerId", site.customer?._id || "");
    setValue("name", site.name);
    setValue("address", site.address);
    setValue("state", site.state);
    setValue("contactPerson", site.contactPerson);
    setValue("mob1", site.mob1);
    setValue("mob2", site.mob2);
    setIsOpen(true);
  };
  const handleAdd = () => {
    setEditingId(null);
    reset({
      customerId: "",
      name: "",
      address: "",
      state: "",
      contactPerson: "",
      mob1: "",
      mob2: ""
    });
    setIsOpen(true);
  };
  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    const url = editingId ? `/api/sites/${editingId}` : "/api/sites";
    const method = editingId ? "PUT" : "POST";
    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        toast.success(editingId ? "Site Updated" : "Site Created");
        setIsOpen(false);
        fetchAll();
      } else {
        toast.error("Failed to save");
      }
    } catch (e) {
      toast.error("Server Error");
    }
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "flex justify-between items-center",
      children: [/* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-2xl font-bold",
          children: "Project Sites"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-muted-foreground",
          children: "Manage construction sites."
        })]
      }), /* @__PURE__ */ jsxs(Button, {
        onClick: handleAdd,
        className: "hover-card-glow bg-orange-600 hover:bg-orange-700",
        children: [/* @__PURE__ */ jsx(Plus, {
          className: "mr-2 h-4 w-4"
        }), " Add Site"]
      })]
    }), /* @__PURE__ */ jsx(Dialog, {
      open: isOpen,
      onOpenChange: setIsOpen,
      children: /* @__PURE__ */ jsxs(DialogContent, {
        className: "sm:max-w-[600px]",
        children: [/* @__PURE__ */ jsx(DialogHeader, {
          children: /* @__PURE__ */ jsxs(DialogTitle, {
            children: [editingId ? "Edit" : "Add", " Site"]
          })
        }), /* @__PURE__ */ jsxs("form", {
          onSubmit: handleSubmit(onSubmit),
          className: "space-y-4 py-2",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "space-y-2",
            children: [/* @__PURE__ */ jsx(Label, {
              children: "Select Customer"
            }), /* @__PURE__ */ jsx(Controller, {
              name: "customerId",
              control,
              render: ({
                field
              }) => /* @__PURE__ */ jsxs(Select, {
                onValueChange: field.onChange,
                value: field.value,
                children: [/* @__PURE__ */ jsx(SelectTrigger, {
                  children: /* @__PURE__ */ jsx(SelectValue, {
                    placeholder: "Select Customer"
                  })
                }), /* @__PURE__ */ jsx(SelectContent, {
                  children: customers2.map((c) => /* @__PURE__ */ jsx(SelectItem, {
                    value: c._id,
                    children: c.name
                  }, c._id))
                })]
              })
            }), errors.customerId && /* @__PURE__ */ jsx("span", {
              className: "text-red-500 text-xs",
              children: "Required"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "grid grid-cols-2 gap-4",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [/* @__PURE__ */ jsx(Label, {
                children: "Site Name"
              }), /* @__PURE__ */ jsx(Input, {
                ...register2("name"),
                placeholder: "e.g. Phase 1"
              }), errors.name && /* @__PURE__ */ jsx("span", {
                className: "text-red-500 text-xs",
                children: "Required"
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [/* @__PURE__ */ jsx(Label, {
                children: "State"
              }), /* @__PURE__ */ jsx(Controller, {
                name: "state",
                control,
                render: ({
                  field
                }) => /* @__PURE__ */ jsxs(Select, {
                  onValueChange: field.onChange,
                  value: field.value || "",
                  children: [/* @__PURE__ */ jsx(SelectTrigger, {
                    children: /* @__PURE__ */ jsx(SelectValue, {
                      placeholder: "Select State"
                    })
                  }), /* @__PURE__ */ jsx(SelectContent, {
                    children: states2.map((s) => /* @__PURE__ */ jsx(SelectItem, {
                      value: s.name,
                      children: s.name
                    }, s._id))
                  })]
                })
              }), errors.state && /* @__PURE__ */ jsx("span", {
                className: "text-red-500 text-xs",
                children: "Required"
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-2",
            children: [/* @__PURE__ */ jsx(Label, {
              children: "Address"
            }), /* @__PURE__ */ jsx(Input, {
              ...register2("address")
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "grid grid-cols-2 gap-4",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [/* @__PURE__ */ jsx(Label, {
                children: "Contact Person"
              }), /* @__PURE__ */ jsx(Input, {
                ...register2("contactPerson")
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [/* @__PURE__ */ jsx(Label, {
                children: "Mobile"
              }), /* @__PURE__ */ jsx(Input, {
                ...register2("mob1")
              })]
            })]
          }), /* @__PURE__ */ jsx(DialogFooter, {
            children: /* @__PURE__ */ jsx(Button, {
              type: "submit",
              className: "hover-card-glow bg-orange-600 w-full",
              children: editingId ? "Update" : "Save"
            })
          })]
        })]
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "grid gap-10 md:grid-cols-3 lg:grid-cols-4",
      children: sites2.length === 0 ? /* @__PURE__ */ jsx("div", {
        className: "col-span-3 text-center py-10 text-slate-400 border rounded-lg border-dashed bg-slate-50",
        children: "No sites found. Add a site to get started."
      }) : sites2.map((site) => /* @__PURE__ */ jsx(Card, {
        className: "relative hover-card-glow hover:shadow-md transition-all group border-l-4 border-l-transparent hover:border-l-orange-500",
        children: /* @__PURE__ */ jsxs(CardContent, {
          className: "p-5",
          children: [/* @__PURE__ */ jsx(Button, {
            variant: "ghost",
            size: "icon",
            className: "absolute top-2 right-2 text-slate-400 hover:text-orange-600",
            onClick: () => handleEdit(site),
            children: /* @__PURE__ */ jsx(Pencil, {
              className: "h-4 w-4"
            })
          }), /* @__PURE__ */ jsx("div", {
            className: "mb-2",
            children: /* @__PURE__ */ jsxs(Badge, {
              variant: "secondary",
              className: "bg-blue-50 text-blue-700 hover:bg-blue-100 flex w-fit items-center gap-1",
              children: [/* @__PURE__ */ jsx(Building2, {
                className: "h-3 w-3"
              }), site.customer?.name || "Unknown Customer"]
            })
          }), /* @__PURE__ */ jsxs("div", {
            className: "mb-3",
            children: [/* @__PURE__ */ jsx("h4", {
              className: "font-bold text-lg text-slate-900",
              children: site.name
            }), /* @__PURE__ */ jsxs("p", {
              className: "text-sm text-slate-500 flex items-center gap-1 mt-1",
              children: [/* @__PURE__ */ jsx(MapPin, {
                className: "h-3 w-3"
              }), " ", site.address, ", ", site.state]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "border-t pt-3 flex justify-between items-center text-xs text-slate-600",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "flex items-center gap-1",
              children: [/* @__PURE__ */ jsx(Phone, {
                className: "h-3 w-3"
              }), " ", site.mob1]
            }), /* @__PURE__ */ jsx("div", {
              className: "font-medium",
              children: site.contactPerson
            })]
          })]
        })
      }, site._id))
    })]
  });
});
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: sites,
  meta: meta$n
}, Symbol.toStringTag, { value: "Module" }));
function Table({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "table-container",
      className: "relative w-full overflow-x-auto",
      children: /* @__PURE__ */ jsx(
        "table",
        {
          "data-slot": "table",
          className: cn("w-full caption-bottom text-sm", className),
          ...props
        }
      )
    }
  );
}
function TableHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "thead",
    {
      "data-slot": "table-header",
      className: cn("[&_tr]:border-b", className),
      ...props
    }
  );
}
function TableBody({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "tbody",
    {
      "data-slot": "table-body",
      className: cn("[&_tr:last-child]:border-0", className),
      ...props
    }
  );
}
function TableRow({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "tr",
    {
      "data-slot": "table-row",
      className: cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      ),
      ...props
    }
  );
}
function TableHead({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "th",
    {
      "data-slot": "table-head",
      className: cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
function TableCell({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "td",
    {
      "data-slot": "table-cell",
      className: cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
function meta$m({}) {
  return [{
    title: "Challans - ScaffRent"
  }];
}
const challanSchema = z.object({
  type: z.enum(["Delivery", "Return"]),
  customer: z.string().min(1, "Select Customer"),
  site: z.string().min(1, "Select Site"),
  vehicleNo: z.string().optional()
});
const challans = UNSAFE_withComponentProps(function Challans() {
  const [customers2, setCustomers] = useState([]);
  const [sites2, setSites] = useState([]);
  const [items2, setItems] = useState([]);
  const [challans2, setChallans] = useState([]);
  const [filteredSites, setFilteredSites] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [qty, setQty] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const {
    register: register2,
    control,
    handleSubmit,
    watch,
    reset,
    setValue
  } = useForm({
    resolver: zodResolver(challanSchema),
    defaultValues: {
      type: "Delivery"
    }
  });
  const selectedCustomerId = watch("customer");
  useEffect(() => {
    const fetchMasters = async () => {
      const token = localStorage.getItem("token");
      const headers = {
        "Authorization": `Bearer ${token}`
      };
      const [custRes, siteRes, itemRes, challanRes] = await Promise.all([fetch("/api/masters/customers", {
        headers
      }), fetch("/api/sites", {
        headers
      }), fetch("/api/masters/items", {
        headers
      }), fetch("/api/challans", {
        headers
      })]);
      if (custRes.ok) setCustomers(await custRes.json());
      if (siteRes.ok) setSites(await siteRes.json());
      if (itemRes.ok) setItems(await itemRes.json());
      if (challanRes.ok) setChallans(await challanRes.json());
    };
    fetchMasters();
  }, []);
  useEffect(() => {
    if (selectedCustomerId) {
      const related = sites2.filter((s) => s.customer?._id === selectedCustomerId);
      setFilteredSites(related);
    } else {
      setFilteredSites([]);
    }
  }, [selectedCustomerId, sites2]);
  const handleEdit = (challan) => {
    setEditingId(challan._id);
    setValue("type", challan.type);
    setValue("vehicleNo", challan.vehicleNo);
    setValue("customer", challan.customer?._id || "");
    const relatedSites = sites2.filter((s) => s.customer?._id === challan.customer?._id);
    setFilteredSites(relatedSites);
    setValue("site", challan.site?._id || "");
    const reconstructedCart = challan.items.map((i) => ({
      itemId: i.item._id,
      itemName: i.item.name,
      itemCode: i.item.code,
      quantity: i.quantity
    }));
    setCart(reconstructedCart);
    setIsOpen(true);
  };
  const handleAdd = () => {
    setEditingId(null);
    setCart([]);
    reset({
      type: "Delivery",
      customer: "",
      site: "",
      vehicleNo: ""
    });
    setIsOpen(true);
  };
  const addToCart = () => {
    if (!selectedItem || qty <= 0) return;
    const itemObj = items2.find((i) => i._id === selectedItem);
    if (!itemObj) return;
    setCart([...cart, {
      itemId: itemObj._id,
      itemName: itemObj.name,
      itemCode: itemObj.code,
      quantity: qty
    }]);
    setSelectedItem("");
    setQty(1);
  };
  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };
  const onSubmit = async (data) => {
    if (cart.length === 0) {
      toast.error("Add at least one item");
      return;
    }
    const payload = {
      ...data,
      items: cart.map((c) => ({
        item: c.itemId,
        quantity: c.quantity
      }))
    };
    const token = localStorage.getItem("token");
    const url = editingId ? `/api/challans/${editingId}` : "/api/challans";
    const method = editingId ? "PUT" : "POST";
    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        toast.success(editingId ? "Challan Updated" : "Challan Created");
        setIsOpen(false);
        reset();
        setCart([]);
        const updatedList = await fetch("/api/challans", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        setChallans(await updatedList.json());
      }
    } catch (e) {
      toast.error("Server Error");
    }
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "flex justify-between items-center",
      children: [/* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-2xl font-bold",
          children: "Challans"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-muted-foreground",
          children: "Manage deliveries."
        })]
      }), /* @__PURE__ */ jsxs(Dialog, {
        open: isOpen,
        onOpenChange: setIsOpen,
        children: [/* @__PURE__ */ jsxs(Button, {
          onClick: handleAdd,
          className: "bg-orange-600",
          children: [/* @__PURE__ */ jsx(Plus, {
            className: "mr-2 h-4 w-4"
          }), " Create Challan"]
        }), /* @__PURE__ */ jsxs(DialogContent, {
          className: "sm:max-w-[700px] max-h-[90vh] overflow-y-auto",
          children: [/* @__PURE__ */ jsx(DialogHeader, {
            children: /* @__PURE__ */ jsx(DialogTitle, {
              children: editingId ? "Edit Transaction" : "New Transaction"
            })
          }), /* @__PURE__ */ jsxs("form", {
            onSubmit: handleSubmit(onSubmit),
            className: "space-y-6 py-2",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-md",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "space-y-2",
                children: [/* @__PURE__ */ jsx(Label, {
                  children: "Type"
                }), /* @__PURE__ */ jsx(Controller, {
                  name: "type",
                  control,
                  render: ({
                    field
                  }) => /* @__PURE__ */ jsxs(Select, {
                    onValueChange: field.onChange,
                    value: field.value,
                    children: [/* @__PURE__ */ jsx(SelectTrigger, {
                      children: /* @__PURE__ */ jsx(SelectValue, {})
                    }), /* @__PURE__ */ jsxs(SelectContent, {
                      children: [/* @__PURE__ */ jsx(SelectItem, {
                        value: "Delivery",
                        children: "Delivery"
                      }), /* @__PURE__ */ jsx(SelectItem, {
                        value: "Return",
                        children: "Return"
                      })]
                    })]
                  })
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "space-y-2",
                children: [/* @__PURE__ */ jsx(Label, {
                  children: "Vehicle No"
                }), /* @__PURE__ */ jsx(Input, {
                  ...register2("vehicleNo")
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "space-y-2",
                children: [/* @__PURE__ */ jsx(Label, {
                  children: "Customer"
                }), /* @__PURE__ */ jsx(Controller, {
                  name: "customer",
                  control,
                  render: ({
                    field
                  }) => /* @__PURE__ */ jsxs(Select, {
                    onValueChange: field.onChange,
                    value: field.value,
                    children: [/* @__PURE__ */ jsx(SelectTrigger, {
                      children: /* @__PURE__ */ jsx(SelectValue, {
                        placeholder: "Select Customer"
                      })
                    }), /* @__PURE__ */ jsx(SelectContent, {
                      children: customers2.map((c) => /* @__PURE__ */ jsx(SelectItem, {
                        value: c._id,
                        children: c.name
                      }, c._id))
                    })]
                  })
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "space-y-2",
                children: [/* @__PURE__ */ jsx(Label, {
                  children: "Site"
                }), /* @__PURE__ */ jsx(Controller, {
                  name: "site",
                  control,
                  render: ({
                    field
                  }) => /* @__PURE__ */ jsxs(Select, {
                    onValueChange: field.onChange,
                    value: field.value,
                    disabled: !selectedCustomerId && !editingId,
                    children: [/* @__PURE__ */ jsx(SelectTrigger, {
                      children: /* @__PURE__ */ jsx(SelectValue, {
                        placeholder: "Select Site"
                      })
                    }), /* @__PURE__ */ jsx(SelectContent, {
                      children: filteredSites.map((s) => /* @__PURE__ */ jsx(SelectItem, {
                        value: s._id,
                        children: s.name
                      }, s._id))
                    })]
                  })
                })]
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-3 border-t pt-4",
              children: [/* @__PURE__ */ jsx(Label, {
                children: "Add Items"
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex gap-2 items-end",
                children: [/* @__PURE__ */ jsxs("div", {
                  className: "flex-1 space-y-1",
                  children: [/* @__PURE__ */ jsx(Label, {
                    className: "text-xs",
                    children: "Item"
                  }), /* @__PURE__ */ jsxs(Select, {
                    value: selectedItem,
                    onValueChange: setSelectedItem,
                    children: [/* @__PURE__ */ jsx(SelectTrigger, {
                      children: /* @__PURE__ */ jsx(SelectValue, {
                        placeholder: "Search..."
                      })
                    }), /* @__PURE__ */ jsx(SelectContent, {
                      className: "max-h-[200px]",
                      children: items2.map((i) => /* @__PURE__ */ jsxs(SelectItem, {
                        value: i._id,
                        children: [i.code, " - ", i.name]
                      }, i._id))
                    })]
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  className: "w-24 space-y-1",
                  children: [/* @__PURE__ */ jsx(Label, {
                    className: "text-xs",
                    children: "Qty"
                  }), /* @__PURE__ */ jsx(Input, {
                    type: "number",
                    value: qty,
                    onChange: (e) => setQty(Number(e.target.value))
                  })]
                }), /* @__PURE__ */ jsx(Button, {
                  type: "button",
                  onClick: addToCart,
                  variant: "secondary",
                  children: "Add"
                })]
              })]
            }), /* @__PURE__ */ jsx("div", {
              className: "border rounded-md max-h-[200px] overflow-auto",
              children: /* @__PURE__ */ jsxs(Table, {
                children: [/* @__PURE__ */ jsx(TableHeader, {
                  children: /* @__PURE__ */ jsxs(TableRow, {
                    className: "bg-slate-50",
                    children: [/* @__PURE__ */ jsx(TableHead, {
                      children: "Code"
                    }), /* @__PURE__ */ jsx(TableHead, {
                      children: "Name"
                    }), /* @__PURE__ */ jsx(TableHead, {
                      className: "text-right",
                      children: "Qty"
                    }), /* @__PURE__ */ jsx(TableHead, {
                      className: "w-[50px]"
                    })]
                  })
                }), /* @__PURE__ */ jsx(TableBody, {
                  children: cart.map((row, idx) => /* @__PURE__ */ jsxs(TableRow, {
                    children: [/* @__PURE__ */ jsx(TableCell, {
                      className: "font-mono text-xs",
                      children: row.itemCode
                    }), /* @__PURE__ */ jsx(TableCell, {
                      children: row.itemName
                    }), /* @__PURE__ */ jsx(TableCell, {
                      className: "text-right font-bold",
                      children: row.quantity
                    }), /* @__PURE__ */ jsx(TableCell, {
                      children: /* @__PURE__ */ jsx(Trash2, {
                        className: "h-4 w-4 text-red-500 cursor-pointer",
                        onClick: () => removeFromCart(idx)
                      })
                    })]
                  }, idx))
                })]
              })
            }), /* @__PURE__ */ jsx(DialogFooter, {
              children: /* @__PURE__ */ jsx(Button, {
                type: "submit",
                className: "bg-orange-600 w-full",
                children: editingId ? "Update Challan" : "Generate Challan"
              })
            })]
          })]
        })]
      })]
    }), /* @__PURE__ */ jsx("div", {
      className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3",
      children: challans2.map((chl) => /* @__PURE__ */ jsx(Card, {
        className: "relative hover-card-glow group border-t-4 border-t-transparent hover:border-t-orange-500",
        children: /* @__PURE__ */ jsxs(CardContent, {
          className: "p-5",
          children: [/* @__PURE__ */ jsx(Button, {
            variant: "ghost",
            size: "icon",
            className: "absolute top-2 right-2 h-8 w-8 text-slate-400 hover:text-orange-600",
            onClick: () => handleEdit(chl),
            children: /* @__PURE__ */ jsx(Pencil, {
              className: "h-4 w-4"
            })
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex justify-between items-start mb-3",
            children: [/* @__PURE__ */ jsx("span", {
              className: "font-bold font-mono text-lg",
              children: chl.challanNo
            }), /* @__PURE__ */ jsxs(Badge, {
              variant: chl.type === "Delivery" ? "default" : "secondary",
              className: chl.type === "Delivery" ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700",
              children: [chl.type === "Delivery" ? /* @__PURE__ */ jsx(ArrowUpRight, {
                className: "h-3 w-3 mr-1"
              }) : /* @__PURE__ */ jsx(ArrowDownRight, {
                className: "h-3 w-3 mr-1"
              }), chl.type]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-1 mb-4",
            children: [/* @__PURE__ */ jsx("p", {
              className: "font-medium text-slate-900 truncate",
              children: chl.site?.name
            }), /* @__PURE__ */ jsx("p", {
              className: "text-sm text-slate-500 truncate",
              children: chl.customer?.name
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "bg-slate-50 p-3 rounded-md text-xs space-y-2",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "flex justify-between text-slate-500",
              children: [/* @__PURE__ */ jsx("span", {
                children: "Date:"
              }), /* @__PURE__ */ jsx("span", {
                children: new Date(chl.createdAt).toLocaleDateString()
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex justify-between font-medium",
              children: [/* @__PURE__ */ jsx("span", {
                children: "Items:"
              }), /* @__PURE__ */ jsxs("span", {
                children: [chl.items?.length || 0, " Types"]
              })]
            })]
          })]
        })
      }, chl._id))
    })]
  });
});
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: challans,
  meta: meta$m
}, Symbol.toStringTag, { value: "Module" }));
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
function meta$l({}) {
  return [{
    title: "Delivery Challan - ScaffRent"
  }];
}
const dcSchema = z.object({
  date: z.string(),
  customer: z.string().min(1, "Select Customer"),
  site: z.string().min(1, "Select Site"),
  warehouse: z.string().min(1, "Select Warehouse"),
  referenceOrder: z.string().optional(),
  // Can be optional if only Manual Items are added
  vehicleNo: z.string().optional(),
  driverName: z.string().optional(),
  driverMobile: z.string().optional(),
  remark: z.string().optional()
});
const deliveryChallans = UNSAFE_withComponentProps(function DeliveryChallans() {
  const [customers2, setCustomers] = useState([]);
  const [sites2, setSites] = useState([]);
  const [warehouses2, setWarehouses] = useState([]);
  const [items2, setItems] = useState([]);
  const [challans2, setChallans] = useState([]);
  const [filteredSites, setFilteredSites] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedSite, setSelectedSite] = useState(null);
  const {
    register: register2,
    control,
    handleSubmit,
    watch,
    setValue,
    reset
  } = useForm({
    resolver: zodResolver(dcSchema),
    defaultValues: {
      date: format(/* @__PURE__ */ new Date(), "yyyy-MM-dd"),
      customer: "",
      site: "",
      warehouse: "",
      referenceOrder: "",
      vehicleNo: "",
      driverName: "",
      driverMobile: "",
      remark: ""
    }
  });
  const watchCustomer = watch("customer");
  const watchSite = watch("site");
  const watchOrder = watch("referenceOrder");
  const fetchAll = async () => {
    const token = localStorage.getItem("token");
    const h = {
      "Authorization": `Bearer ${token}`
    };
    try {
      const [c, s, w, d, i] = await Promise.all([
        fetch("/api/masters/customers", {
          headers: h
        }).then((r) => r.json()),
        fetch("/api/sites", {
          headers: h
        }).then((r) => r.json()),
        fetch("/api/masters/warehouses", {
          headers: h
        }).then((r) => r.json()),
        fetch("/api/store/delivery-challans", {
          headers: h
        }).then((r) => r.json()),
        fetch("/api/masters/items", {
          headers: h
        }).then((r) => r.json())
        // ✅ Fetch Items
      ]);
      setCustomers(c);
      setSites(s);
      setWarehouses(w);
      setChallans(d);
      setItems(i);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchAll();
  }, []);
  useEffect(() => {
    if (watchCustomer) {
      const cust = customers2.find((c) => c._id === watchCustomer);
      setSelectedCustomer(cust);
      const relSites = sites2.filter((s) => s.customer?._id === watchCustomer);
      setFilteredSites(relSites);
    } else {
      setSelectedCustomer(null);
      setFilteredSites([]);
    }
  }, [watchCustomer]);
  useEffect(() => {
    if (watchCustomer && watchSite && !editingId) {
      const site = sites2.find((s) => s._id === watchSite);
      setSelectedSite(site);
      const fetchOrders = async () => {
        const token = localStorage.getItem("token");
        const res = await fetch(`/api/store/pending-orders?customerId=${watchCustomer}&siteId=${watchSite}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (res.ok) setPendingOrders(await res.json());
      };
      fetchOrders();
    }
  }, [watchSite]);
  useEffect(() => {
    if (watchOrder && !editingId) {
      const order = pendingOrders.find((o) => o._id === watchOrder);
      if (order) {
        const gridData = order.items.map((i) => ({
          item: i.item,
          itemCode: i.itemCode,
          itemName: i.itemName,
          unit: i.unit,
          orderQty: i.orderQty,
          pendingQty: i.pending,
          currentQty: i.pending,
          // Default to max
          rate: i.rate,
          amount: i.rate * i.pending,
          isManual: false
          // ✅ Flag to mark auto-fetched items
        }));
        setRows(gridData);
      }
    } else if (!editingId && !watchOrder) {
      setRows([]);
    }
  }, [watchOrder]);
  const handleAddManualItem = () => {
    setRows([...rows, {
      item: "",
      itemCode: "",
      itemName: "",
      unit: "",
      orderQty: 0,
      pendingQty: 0,
      currentQty: 1,
      rate: 0,
      amount: 0,
      isManual: true
      // ✅ Flag for manual items
    }]);
  };
  const handleManualItemSelect = (index, itemId) => {
    const selectedItem = items2.find((i) => i._id === itemId);
    if (!selectedItem) return;
    const newRows = [...rows];
    newRows[index] = {
      ...newRows[index],
      item: selectedItem._id,
      itemCode: selectedItem.code,
      itemName: selectedItem.name,
      unit: selectedItem.unit,
      rate: selectedItem.monthlyRentRate || selectedItem.sellRate || 0,
      // Fallback rates
      amount: (selectedItem.monthlyRentRate || 0) * newRows[index].currentQty
    };
    setRows(newRows);
  };
  const handleQtyChange = (index, val) => {
    const v = parseFloat(val) || 0;
    const newRows = [...rows];
    const row = newRows[index];
    if (!row.isManual && v > row.pendingQty) {
      toast.error(`Max pending quantity is ${row.pendingQty}`);
      row.currentQty = row.pendingQty;
    } else {
      row.currentQty = v;
    }
    row.amount = row.currentQty * row.rate;
    setRows(newRows);
  };
  const removeRow = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };
  const handleEdit = (dc) => {
    setEditingId(dc._id);
    setValue("date", dc.date.split("T")[0]);
    setValue("customer", dc.customer._id);
    setValue("site", dc.site._id);
    setValue("warehouse", dc.warehouse);
    setValue("referenceOrder", dc.referenceOrder._id);
    setValue("vehicleNo", dc.vehicleNo);
    setValue("driverName", dc.driverName);
    setValue("driverMobile", dc.driverMobile);
    setValue("remark", dc.remark);
    const grid = dc.items.map((i) => ({
      item: i.item._id,
      itemCode: i.item.code || "ITM",
      itemName: i.itemName,
      unit: i.unit,
      orderQty: i.orderQty || 0,
      pendingQty: i.pendingQty || 0,
      currentQty: i.currentQty,
      rate: i.rate,
      amount: i.amount,
      isManual: i.orderQty === 0 || i.orderQty === void 0
      // Infer if manual
    }));
    setRows(grid);
    setOpen(true);
  };
  const handleAdd = () => {
    setEditingId(null);
    setRows([]);
    reset({
      date: format(/* @__PURE__ */ new Date(), "yyyy-MM-dd"),
      customer: "",
      site: "",
      warehouse: "",
      referenceOrder: "",
      vehicleNo: "",
      driverName: "",
      driverMobile: "",
      remark: ""
    });
    setOpen(true);
  };
  const onSubmit = async (data) => {
    const finalItems = rows.filter((r) => r.currentQty > 0 && r.item);
    if (finalItems.length === 0) return toast.error("No valid items to deliver");
    const payload = {
      ...data,
      items: finalItems
    };
    const token = localStorage.getItem("token");
    const url = editingId ? `/api/store/delivery-challans/${editingId}` : "/api/store/delivery-challans";
    const method = editingId ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      toast.success(editingId ? "Challan Updated" : "Challan Created");
      setOpen(false);
      reset();
      setRows([]);
      fetchAll();
    } else {
      toast.error("Failed to save");
    }
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "flex justify-between items-center",
      children: [/* @__PURE__ */ jsx("h2", {
        className: "text-2xl font-bold",
        children: "Delivery Challans"
      }), /* @__PURE__ */ jsxs(Button, {
        onClick: handleAdd,
        className: "bg-orange-600 hover:bg-orange-700 hover-card-glow",
        children: [/* @__PURE__ */ jsx(Plus, {
          className: "mr-2 h-4 w-4"
        }), " Create DC"]
      })]
    }), /* @__PURE__ */ jsx(Dialog, {
      open,
      onOpenChange: setOpen,
      children: /* @__PURE__ */ jsxs(DialogContent, {
        className: "sm:max-w-[1000px] max-h-[95vh] overflow-y-auto",
        children: [/* @__PURE__ */ jsx(DialogHeader, {
          children: /* @__PURE__ */ jsx(DialogTitle, {
            children: editingId ? "Edit Delivery Challan" : "New Delivery Challan"
          })
        }), /* @__PURE__ */ jsxs("form", {
          onSubmit: handleSubmit(onSubmit),
          className: "space-y-6 py-2",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg border",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [/* @__PURE__ */ jsx(Label, {
                children: "Doc Date"
              }), /* @__PURE__ */ jsx(Input, {
                type: "date",
                ...register2("date")
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [/* @__PURE__ */ jsx(Label, {
                children: "Customer"
              }), /* @__PURE__ */ jsx(Controller, {
                name: "customer",
                control,
                render: ({
                  field
                }) => /* @__PURE__ */ jsxs(Select, {
                  onValueChange: field.onChange,
                  value: field.value,
                  disabled: !!editingId,
                  children: [/* @__PURE__ */ jsx(SelectTrigger, {
                    children: /* @__PURE__ */ jsx(SelectValue, {
                      placeholder: "Select"
                    })
                  }), /* @__PURE__ */ jsx(SelectContent, {
                    children: customers2.map((c) => /* @__PURE__ */ jsx(SelectItem, {
                      value: c._id,
                      children: c.name
                    }, c._id))
                  })]
                })
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [/* @__PURE__ */ jsx(Label, {
                children: "Site"
              }), /* @__PURE__ */ jsx(Controller, {
                name: "site",
                control,
                render: ({
                  field
                }) => /* @__PURE__ */ jsxs(Select, {
                  onValueChange: field.onChange,
                  value: field.value,
                  disabled: !watchCustomer || !!editingId,
                  children: [/* @__PURE__ */ jsx(SelectTrigger, {
                    children: /* @__PURE__ */ jsx(SelectValue, {
                      placeholder: "Select"
                    })
                  }), /* @__PURE__ */ jsx(SelectContent, {
                    children: filteredSites.map((s) => /* @__PURE__ */ jsx(SelectItem, {
                      value: s._id,
                      children: s.name
                    }, s._id))
                  })]
                })
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "md:col-span-3 grid grid-cols-2 gap-4 text-xs text-slate-500",
              children: [/* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("strong", {
                  children: "Billing:"
                }), " ", selectedCustomer?.billingAddress || "-"]
              }), /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("strong", {
                  children: "Site:"
                }), " ", selectedSite?.address || "-"]
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "grid grid-cols-1 md:grid-cols-2 gap-4",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [/* @__PURE__ */ jsx(Label, {
                className: "text-orange-600",
                children: "Against Order (Ref)"
              }), /* @__PURE__ */ jsx(Controller, {
                name: "referenceOrder",
                control,
                render: ({
                  field
                }) => /* @__PURE__ */ jsxs(Select, {
                  onValueChange: field.onChange,
                  value: field.value,
                  disabled: !watchSite || !!editingId,
                  children: [/* @__PURE__ */ jsx(SelectTrigger, {
                    children: /* @__PURE__ */ jsx(SelectValue, {
                      placeholder: "Select Pending Order"
                    })
                  }), /* @__PURE__ */ jsx(SelectContent, {
                    children: pendingOrders.length === 0 ? /* @__PURE__ */ jsx("div", {
                      className: "p-2 text-xs text-slate-400",
                      children: "No pending orders"
                    }) : pendingOrders.map((o) => /* @__PURE__ */ jsx(SelectItem, {
                      value: o._id,
                      children: o.docNo
                    }, o._id))
                  })]
                })
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [/* @__PURE__ */ jsx(Label, {
                children: "From Warehouse"
              }), /* @__PURE__ */ jsx(Controller, {
                name: "warehouse",
                control,
                render: ({
                  field
                }) => /* @__PURE__ */ jsxs(Select, {
                  onValueChange: field.onChange,
                  value: field.value,
                  children: [/* @__PURE__ */ jsx(SelectTrigger, {
                    children: /* @__PURE__ */ jsx(SelectValue, {
                      placeholder: "Select"
                    })
                  }), /* @__PURE__ */ jsx(SelectContent, {
                    children: warehouses2.map((w) => /* @__PURE__ */ jsx(SelectItem, {
                      value: w._id,
                      children: w.name
                    }, w._id))
                  })]
                })
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "grid grid-cols-3 gap-4",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [/* @__PURE__ */ jsx(Label, {
                children: "Vehicle No"
              }), /* @__PURE__ */ jsx(Input, {
                ...register2("vehicleNo")
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [/* @__PURE__ */ jsx(Label, {
                children: "Driver Name"
              }), /* @__PURE__ */ jsx(Input, {
                ...register2("driverName")
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [/* @__PURE__ */ jsx(Label, {
                children: "Driver Mobile"
              }), /* @__PURE__ */ jsx(Input, {
                ...register2("driverMobile")
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "border rounded-md overflow-hidden",
            children: [/* @__PURE__ */ jsxs(Table, {
              children: [/* @__PURE__ */ jsx(TableHeader, {
                children: /* @__PURE__ */ jsxs(TableRow, {
                  className: "bg-slate-100",
                  children: [/* @__PURE__ */ jsx(TableHead, {
                    className: "w-[50px]",
                    children: "Sr."
                  }), /* @__PURE__ */ jsx(TableHead, {
                    className: "w-[120px]",
                    children: "Item ID"
                  }), /* @__PURE__ */ jsx(TableHead, {
                    children: "Item Name"
                  }), /* @__PURE__ */ jsx(TableHead, {
                    className: "text-right",
                    children: "Order Qty"
                  }), /* @__PURE__ */ jsx(TableHead, {
                    className: "text-right",
                    children: "Pending"
                  }), /* @__PURE__ */ jsx(TableHead, {
                    className: "w-[100px] text-right text-orange-600 font-bold",
                    children: "Curr. Qty"
                  }), /* @__PURE__ */ jsx(TableHead, {
                    className: "text-right",
                    children: "Rate"
                  }), /* @__PURE__ */ jsx(TableHead, {
                    className: "text-right",
                    children: "Amount"
                  }), /* @__PURE__ */ jsx(TableHead, {
                    className: "w-[50px]"
                  })]
                })
              }), /* @__PURE__ */ jsx(TableBody, {
                children: rows.length === 0 ? /* @__PURE__ */ jsx(TableRow, {
                  children: /* @__PURE__ */ jsx(TableCell, {
                    colSpan: 9,
                    className: "text-center h-20 text-slate-400",
                    children: "Select an order or add manual items"
                  })
                }) : rows.map((row, i) => /* @__PURE__ */ jsxs(TableRow, {
                  children: [/* @__PURE__ */ jsx(TableCell, {
                    children: i + 1
                  }), /* @__PURE__ */ jsx(TableCell, {
                    className: "font-mono text-xs",
                    children: row.itemCode
                  }), /* @__PURE__ */ jsx(TableCell, {
                    children: row.isManual ? /* @__PURE__ */ jsxs(Select, {
                      value: row.item,
                      onValueChange: (val) => handleManualItemSelect(i, val),
                      children: [/* @__PURE__ */ jsx(SelectTrigger, {
                        className: "h-8 min-w-[150px]",
                        children: /* @__PURE__ */ jsx(SelectValue, {
                          placeholder: "Select Item"
                        })
                      }), /* @__PURE__ */ jsx(SelectContent, {
                        children: items2.map((it) => /* @__PURE__ */ jsx(SelectItem, {
                          value: it._id,
                          children: it.name
                        }, it._id))
                      })]
                    }) : /* @__PURE__ */ jsxs("div", {
                      className: "flex flex-col",
                      children: [/* @__PURE__ */ jsx("span", {
                        children: row.itemName
                      }), /* @__PURE__ */ jsx("span", {
                        className: "text-[10px] text-slate-400",
                        children: row.unit
                      })]
                    })
                  }), /* @__PURE__ */ jsx(TableCell, {
                    className: "text-right text-slate-500",
                    children: row.orderQty || "-"
                  }), /* @__PURE__ */ jsx(TableCell, {
                    className: "text-right text-orange-600 font-medium",
                    children: row.pendingQty || "-"
                  }), /* @__PURE__ */ jsx(TableCell, {
                    children: /* @__PURE__ */ jsx(Input, {
                      type: "number",
                      className: "text-right h-8 font-bold border-orange-200 focus-visible:ring-orange-500",
                      value: row.currentQty,
                      onChange: (e) => handleQtyChange(i, e.target.value)
                    })
                  }), /* @__PURE__ */ jsx(TableCell, {
                    className: "text-right",
                    children: row.rate
                  }), /* @__PURE__ */ jsxs(TableCell, {
                    className: "text-right font-medium",
                    children: ["₹", row.amount.toFixed(2)]
                  }), /* @__PURE__ */ jsx(TableCell, {
                    children: row.isManual && /* @__PURE__ */ jsx(Button, {
                      type: "button",
                      variant: "ghost",
                      size: "icon",
                      onClick: () => removeRow(i),
                      children: /* @__PURE__ */ jsx(Trash2, {
                        className: "h-4 w-4 text-red-500"
                      })
                    })
                  })]
                }, i))
              })]
            }), /* @__PURE__ */ jsx("div", {
              className: "p-2 border-t bg-slate-50 flex justify-center",
              children: /* @__PURE__ */ jsxs(Button, {
                type: "button",
                variant: "outline",
                size: "sm",
                onClick: handleAddManualItem,
                className: "border-dashed text-slate-600",
                children: [/* @__PURE__ */ jsx(Plus, {
                  className: "mr-2 h-4 w-4"
                }), " Add Extra Item"]
              })
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-2",
            children: [/* @__PURE__ */ jsx(Label, {
              children: "Remark"
            }), /* @__PURE__ */ jsx(Textarea, {
              ...register2("remark"),
              placeholder: "Optional notes",
              className: "h-16"
            })]
          }), /* @__PURE__ */ jsx(DialogFooter, {
            className: "flex justify-end gap-2",
            children: /* @__PURE__ */ jsx(Button, {
              type: "submit",
              className: "hover-card-glow bg-orange-600 px-6",
              children: editingId ? "Update Challan" : "Generate Challan"
            })
          })]
        })]
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "grid gap-10 md:grid-cols-4 lg:grid-cols-4",
      children: challans2.map((dc) => /* @__PURE__ */ jsx(Card, {
        className: "relative hover-card-glow hover:shadow-md transition-all",
        children: /* @__PURE__ */ jsxs(CardContent, {
          className: "p-5",
          children: [/* @__PURE__ */ jsx(Button, {
            variant: "ghost",
            size: "icon",
            className: "absolute top-2 right-2 text-slate-400 hover:text-orange-600",
            onClick: () => handleEdit(dc),
            children: /* @__PURE__ */ jsx(Pencil, {
              className: "h-4 w-4"
            })
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex justify-between items-start mb-3",
            children: [/* @__PURE__ */ jsx("span", {
              className: "font-bold text-lg text-slate-800",
              children: dc.docNo
            }), /* @__PURE__ */ jsx(Badge, {
              variant: "outline",
              className: "text-xs",
              children: new Date(dc.date).toLocaleDateString()
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "text-sm space-y-1 text-slate-600",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "flex items-center gap-2",
              children: [/* @__PURE__ */ jsx(User, {
                className: "h-3 w-3"
              }), " ", dc.customer?.name]
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex items-center gap-2",
              children: [/* @__PURE__ */ jsx(MapPin, {
                className: "h-3 w-3"
              }), " ", dc.site?.name]
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex items-center gap-2",
              children: [/* @__PURE__ */ jsx(Truck, {
                className: "h-3 w-3"
              }), " ", dc.vehicleNo || "No Vehicle"]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "mt-4 pt-3 border-t flex justify-between text-xs font-medium text-slate-500",
            children: [/* @__PURE__ */ jsxs("span", {
              children: ["Ref: ", dc.referenceOrder?.docNo]
            }), /* @__PURE__ */ jsxs("span", {
              className: "text-orange-600",
              children: [dc.items?.length, " Items Sent"]
            })]
          })]
        })
      }, dc._id))
    })]
  });
});
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: deliveryChallans,
  meta: meta$l
}, Symbol.toStringTag, { value: "Module" }));
function meta$k({}) {
  return [{
    title: "Employees - ScaffRent"
  }];
}
const empSchema = z.object({
  name: z.string().min(2, "Name required"),
  mobile: z.string().min(10, "Valid mobile required"),
  email: z.string().email(),
  dept: z.string().min(1, "Department is required"),
  role: z.string().min(2, "Role is required")
});
const employees = UNSAFE_withComponentProps(function Employees() {
  const [employees2, setEmployees] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const {
    register: register2,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: {
      errors
    }
  } = useForm({
    resolver: zodResolver(empSchema)
  });
  const fetchEmployees = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("/api/masters/employees", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (res.ok) setEmployees(await res.json());
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchEmployees();
  }, []);
  const handleEdit = (emp) => {
    setEditingId(emp._id);
    setValue("name", emp.name);
    setValue("mobile", emp.mobile);
    setValue("email", emp.email);
    setValue("dept", emp.dept);
    setValue("role", emp.role);
    setOpen(true);
  };
  const handleAdd = () => {
    setEditingId(null);
    reset({
      name: "",
      mobile: "",
      email: "",
      dept: "",
      role: ""
    });
    setOpen(true);
  };
  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    const url = editingId ? `/api/masters/employees/${editingId}` : "/api/masters/employees";
    const method = editingId ? "PUT" : "POST";
    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        toast.success(editingId ? "Employee Updated" : "Employee Added");
        reset();
        setOpen(false);
        fetchEmployees();
      }
    } catch (e) {
      toast.error("Error saving employee");
    }
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
      children: [/* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-2xl font-bold tracking-tight",
          children: "Employee Directory"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-muted-foreground",
          children: "Manage staff access and roles."
        })]
      }), /* @__PURE__ */ jsxs(Dialog, {
        open,
        onOpenChange: setOpen,
        children: [/* @__PURE__ */ jsxs(Button, {
          onClick: handleAdd,
          className: "hover-card-glow bg-orange-600 hover:bg-orange-700",
          children: [/* @__PURE__ */ jsx(Plus, {
            className: "mr-2 h-4 w-4"
          }), " Add Employee"]
        }), /* @__PURE__ */ jsxs(DialogContent, {
          className: "sm:max-w-[425px]",
          children: [/* @__PURE__ */ jsx(DialogHeader, {
            children: /* @__PURE__ */ jsx(DialogTitle, {
              children: editingId ? "Edit Employee" : "Add Employee"
            })
          }), /* @__PURE__ */ jsxs("form", {
            onSubmit: handleSubmit(onSubmit),
            className: "space-y-4 py-2",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [/* @__PURE__ */ jsx(Label, {
                children: "Full Name"
              }), /* @__PURE__ */ jsx(Input, {
                ...register2("name")
              }), errors.name && /* @__PURE__ */ jsx("span", {
                className: "text-red-500 text-xs",
                children: errors.name.message
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "grid grid-cols-2 gap-4",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "space-y-2",
                children: [/* @__PURE__ */ jsx(Label, {
                  children: "Mobile"
                }), /* @__PURE__ */ jsx(Input, {
                  ...register2("mobile")
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "space-y-2",
                children: [/* @__PURE__ */ jsx(Label, {
                  children: "Email"
                }), /* @__PURE__ */ jsx(Input, {
                  ...register2("email")
                })]
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [/* @__PURE__ */ jsx(Label, {
                children: "Department"
              }), /* @__PURE__ */ jsx(Controller, {
                name: "dept",
                control,
                render: ({
                  field
                }) => /* @__PURE__ */ jsxs(Select, {
                  onValueChange: field.onChange,
                  value: field.value,
                  children: [/* @__PURE__ */ jsx(SelectTrigger, {
                    children: /* @__PURE__ */ jsx(SelectValue, {
                      placeholder: "Select Dept"
                    })
                  }), /* @__PURE__ */ jsxs(SelectContent, {
                    children: [/* @__PURE__ */ jsx(SelectItem, {
                      value: "Sales",
                      children: "Sales"
                    }), /* @__PURE__ */ jsx(SelectItem, {
                      value: "Logistics",
                      children: "Logistics"
                    }), /* @__PURE__ */ jsx(SelectItem, {
                      value: "Accounts",
                      children: "Accounts"
                    }), /* @__PURE__ */ jsx(SelectItem, {
                      value: "Store",
                      children: "Store"
                    })]
                  })]
                })
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [/* @__PURE__ */ jsx(Label, {
                children: "Role"
              }), /* @__PURE__ */ jsx(Input, {
                ...register2("role")
              })]
            }), /* @__PURE__ */ jsx(DialogFooter, {
              children: /* @__PURE__ */ jsx(Button, {
                type: "submit",
                className: "hover-card-glow bg-orange-600 w-full",
                children: editingId ? "Update" : "Save"
              })
            })]
          })]
        })]
      })]
    }), /* @__PURE__ */ jsx(Card, {
      className: "relative hover-card-glow overflow-x-auto",
      children: /* @__PURE__ */ jsx(CardContent, {
        className: "p-0",
        children: /* @__PURE__ */ jsxs(Table, {
          children: [/* @__PURE__ */ jsx(TableHeader, {
            children: /* @__PURE__ */ jsxs(TableRow, {
              className: "bg-slate-50",
              children: [/* @__PURE__ */ jsx(TableHead, {
                children: "Avatar"
              }), /* @__PURE__ */ jsx(TableHead, {
                children: "Details"
              }), /* @__PURE__ */ jsx(TableHead, {
                children: "Department"
              }), /* @__PURE__ */ jsx(TableHead, {
                children: "Contact"
              }), /* @__PURE__ */ jsx(TableHead, {
                className: "w-[50px]"
              })]
            })
          }), /* @__PURE__ */ jsx(TableBody, {
            children: employees2.length === 0 ? /* @__PURE__ */ jsx(TableRow, {
              children: /* @__PURE__ */ jsx(TableCell, {
                colSpan: 5,
                className: "text-center h-24",
                children: "No employees found."
              })
            }) : employees2.map((emp) => /* @__PURE__ */ jsxs(TableRow, {
              children: [/* @__PURE__ */ jsx(TableCell, {
                children: /* @__PURE__ */ jsxs(Avatar, {
                  children: [/* @__PURE__ */ jsx(AvatarImage, {
                    src: `https://api.dicebear.com/7.x/avataaars/svg?seed=${emp.name}`
                  }), /* @__PURE__ */ jsx(AvatarFallback, {
                    children: emp.name[0]
                  })]
                })
              }), /* @__PURE__ */ jsx(TableCell, {
                children: /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("p", {
                    className: "font-medium text-slate-900",
                    children: emp.name
                  }), /* @__PURE__ */ jsxs("p", {
                    className: "text-xs text-slate-500 font-mono",
                    children: [emp.code, " • ", emp.role]
                  })]
                })
              }), /* @__PURE__ */ jsx(TableCell, {
                children: /* @__PURE__ */ jsx(Badge, {
                  variant: "secondary",
                  children: emp.dept
                })
              }), /* @__PURE__ */ jsx(TableCell, {
                children: /* @__PURE__ */ jsxs("div", {
                  className: "flex flex-col gap-1 text-sm text-slate-600",
                  children: [/* @__PURE__ */ jsxs("div", {
                    className: "flex items-center gap-2",
                    children: [/* @__PURE__ */ jsx(Phone, {
                      className: "h-3 w-3"
                    }), " ", emp.mobile]
                  }), /* @__PURE__ */ jsxs("div", {
                    className: "flex items-center gap-2",
                    children: [/* @__PURE__ */ jsx(Mail, {
                      className: "h-3 w-3"
                    }), " ", emp.email]
                  })]
                })
              }), /* @__PURE__ */ jsx(TableCell, {
                children: /* @__PURE__ */ jsx(Button, {
                  variant: "ghost",
                  size: "icon",
                  onClick: () => handleEdit(emp),
                  children: /* @__PURE__ */ jsx(Pencil, {
                    className: "h-4 w-4 text-slate-400"
                  })
                })
              })]
            }, emp._id))
          })]
        })
      })
    })]
  });
});
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: employees,
  meta: meta$k
}, Symbol.toStringTag, { value: "Module" }));
function meta$j({}) {
  return [{
    title: "Item Master - ScaffRent"
  }];
}
const itemSchema = z.object({
  name: z.string().min(2, "Name required"),
  group: z.string().min(1, "Group (Category) required"),
  unit: z.string().min(1, "Unit required"),
  // HSN Validation
  hsnCode: z.string().optional().or(z.literal("")).refine((val) => !val || validateHSN(val), {
    message: "Invalid HSN (Must be 2, 4, 6 or 8 digits)"
  }),
  // Financials - Use z.coerce to handle String input -> Number output
  purchaseRate: z.coerce.number().min(0),
  sellRate: z.coerce.number().min(0),
  monthlyRentRate: z.coerce.number().min(0),
  weight: z.coerce.number().min(0)
});
const items = UNSAFE_withComponentProps(function Items() {
  const [items2, setItems] = useState([]);
  const [groups, setGroups] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const {
    register: register2,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: {
      errors
    }
  } = useForm({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      name: "",
      group: "",
      unit: "",
      hsnCode: "",
      purchaseRate: 0,
      sellRate: 0,
      monthlyRentRate: 0,
      weight: 0
    }
  });
  const fetchData = async () => {
    const token = localStorage.getItem("token");
    const headers = {
      "Authorization": `Bearer ${token}`
    };
    try {
      const [itemsRes, groupsRes] = await Promise.all([fetch("/api/masters/items", {
        headers
      }), fetch("/api/masters/groups", {
        headers
      })]);
      if (itemsRes.ok) setItems(await itemsRes.json());
      if (groupsRes.ok) setGroups(await groupsRes.json());
    } catch (error) {
      toast.error("Network Error");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleEdit = (item) => {
    setEditingId(item._id);
    setValue("name", item.name);
    setValue("group", item.group?._id || "");
    setValue("unit", item.unit);
    setValue("hsnCode", item.hsnCode || "");
    setValue("purchaseRate", item.purchaseRate);
    setValue("sellRate", item.sellRate);
    setValue("monthlyRentRate", item.monthlyRentRate);
    setValue("weight", item.weight);
    setOpen(true);
  };
  const handleAdd = () => {
    setEditingId(null);
    reset({
      name: "",
      group: "",
      unit: "",
      hsnCode: "",
      purchaseRate: 0,
      sellRate: 0,
      monthlyRentRate: 0,
      weight: 0
    });
    setOpen(true);
  };
  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    const url = editingId ? `/api/masters/items/${editingId}` : "/api/masters/items";
    const method = editingId ? "PUT" : "POST";
    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        toast.success(editingId ? "Item Updated" : "Item Added");
        setOpen(false);
        fetchData();
      } else {
        toast.error("Failed to save");
      }
    } catch (error) {
      toast.error("Server Error");
    }
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4",
      children: [/* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-2xl font-bold",
          children: "Item Master"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-muted-foreground",
          children: "Manage products and pricing."
        })]
      }), /* @__PURE__ */ jsxs(Button, {
        onClick: handleAdd,
        className: "hover-card-glow bg-orange-600 w-full sm:w-auto",
        children: [/* @__PURE__ */ jsx(Plus, {
          className: "mr-2 h-4 w-4"
        }), " Add Item"]
      })]
    }), /* @__PURE__ */ jsx(Dialog, {
      open,
      onOpenChange: setOpen,
      children: /* @__PURE__ */ jsxs(DialogContent, {
        className: "w-[95%] sm:max-w-[700px] max-h-[90vh] overflow-y-auto rounded-lg",
        children: [/* @__PURE__ */ jsx(DialogHeader, {
          children: /* @__PURE__ */ jsx(DialogTitle, {
            children: editingId ? "Edit Item" : "Add Inventory Item"
          })
        }), /* @__PURE__ */ jsxs("form", {
          onSubmit: handleSubmit(onSubmit),
          className: "space-y-4 py-2",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [/* @__PURE__ */ jsx(Label, {
                children: "Item Name"
              }), /* @__PURE__ */ jsx(Input, {
                ...register2("name"),
                placeholder: "Item Name"
              }), errors.name && /* @__PURE__ */ jsx("span", {
                className: "text-red-500 text-xs",
                children: errors.name.message
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [/* @__PURE__ */ jsx(Label, {
                children: "Item Group"
              }), /* @__PURE__ */ jsx(Controller, {
                name: "group",
                control,
                render: ({
                  field
                }) => /* @__PURE__ */ jsxs(Select, {
                  onValueChange: field.onChange,
                  value: field.value,
                  children: [/* @__PURE__ */ jsx(SelectTrigger, {
                    children: /* @__PURE__ */ jsx(SelectValue, {
                      placeholder: "Select Category"
                    })
                  }), /* @__PURE__ */ jsx(SelectContent, {
                    children: groups.map((g) => /* @__PURE__ */ jsx(SelectItem, {
                      value: g._id,
                      children: g.name
                    }, g._id))
                  })]
                })
              }), errors.group && /* @__PURE__ */ jsx("span", {
                className: "text-red-500 text-xs",
                children: errors.group.message
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [/* @__PURE__ */ jsx(Label, {
                children: "Unit of Measurement"
              }), /* @__PURE__ */ jsx(Controller, {
                name: "unit",
                control,
                render: ({
                  field
                }) => /* @__PURE__ */ jsxs(Select, {
                  onValueChange: field.onChange,
                  value: field.value,
                  children: [/* @__PURE__ */ jsx(SelectTrigger, {
                    children: /* @__PURE__ */ jsx(SelectValue, {
                      placeholder: "Select Unit"
                    })
                  }), /* @__PURE__ */ jsxs(SelectContent, {
                    children: [/* @__PURE__ */ jsx(SelectItem, {
                      value: "Nos",
                      children: "Nos"
                    }), /* @__PURE__ */ jsx(SelectItem, {
                      value: "Kg",
                      children: "Kg"
                    }), /* @__PURE__ */ jsx(SelectItem, {
                      value: "Mtr",
                      children: "Mtr"
                    }), /* @__PURE__ */ jsx(SelectItem, {
                      value: "Set",
                      children: "Set"
                    }), /* @__PURE__ */ jsx(SelectItem, {
                      value: "Sq.ft",
                      children: "Sq.ft"
                    })]
                  })]
                })
              }), errors.unit && /* @__PURE__ */ jsx("span", {
                className: "text-red-500 text-xs",
                children: errors.unit.message
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [/* @__PURE__ */ jsx(Label, {
                children: "HSN Code"
              }), /* @__PURE__ */ jsx(Input, {
                ...register2("hsnCode"),
                placeholder: "Manual HSN (Numeric)",
                maxLength: 8,
                onChange: (e) => {
                  const val = e.target.value.replace(/[^0-9]/g, "");
                  setValue("hsnCode", val, {
                    shouldValidate: true
                  });
                }
              }), errors.hsnCode && /* @__PURE__ */ jsx("span", {
                className: "text-red-500 text-xs",
                children: errors.hsnCode.message
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "grid grid-cols-1 sm:grid-cols-3 gap-4 border-t pt-2",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [/* @__PURE__ */ jsx(Label, {
                children: "Monthly Rent (₹)"
              }), /* @__PURE__ */ jsx(Input, {
                type: "number",
                step: "0.01",
                ...register2("monthlyRentRate")
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [/* @__PURE__ */ jsx(Label, {
                children: "Sell Rate (₹)"
              }), /* @__PURE__ */ jsx(Input, {
                type: "number",
                step: "0.01",
                ...register2("sellRate")
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [/* @__PURE__ */ jsx(Label, {
                children: "Purchase Rate (₹)"
              }), /* @__PURE__ */ jsx(Input, {
                type: "number",
                step: "0.01",
                ...register2("purchaseRate")
              })]
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "grid grid-cols-1 sm:grid-cols-3 gap-4",
            children: /* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [/* @__PURE__ */ jsx(Label, {
                children: "Weight (Per Unit)"
              }), /* @__PURE__ */ jsx(Input, {
                type: "number",
                step: "0.001",
                ...register2("weight"),
                placeholder: "Kgs"
              })]
            })
          }), /* @__PURE__ */ jsx(DialogFooter, {
            children: /* @__PURE__ */ jsx(Button, {
              type: "submit",
              className: "hover-card-glow bg-orange-600 w-full",
              children: editingId ? "Update" : "Save"
            })
          })]
        })]
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "rounded-md border bg-white overflow-x-auto",
      children: /* @__PURE__ */ jsxs(Table, {
        className: "min-w-[600px]",
        children: [/* @__PURE__ */ jsx(TableHeader, {
          children: /* @__PURE__ */ jsxs(TableRow, {
            className: "bg-slate-50",
            children: [/* @__PURE__ */ jsx(TableHead, {
              children: "Code"
            }), /* @__PURE__ */ jsx(TableHead, {
              children: "Name"
            }), /* @__PURE__ */ jsx(TableHead, {
              children: "Group"
            }), /* @__PURE__ */ jsx(TableHead, {
              children: "HSN"
            }), /* @__PURE__ */ jsx(TableHead, {
              className: "text-right",
              children: "Rent (Mo)"
            }), /* @__PURE__ */ jsx(TableHead, {
              className: "text-right",
              children: "Weight"
            }), /* @__PURE__ */ jsx(TableHead, {
              className: "w-[50px]"
            })]
          })
        }), /* @__PURE__ */ jsx(TableBody, {
          children: items2.map((item) => /* @__PURE__ */ jsxs(TableRow, {
            children: [/* @__PURE__ */ jsx(TableCell, {
              className: "font-mono text-orange-600 font-medium",
              children: item.code
            }), /* @__PURE__ */ jsx(TableCell, {
              children: item.name
            }), /* @__PURE__ */ jsx(TableCell, {
              children: /* @__PURE__ */ jsx(Badge, {
                variant: "outline",
                children: item.group?.name || "No Group"
              })
            }), /* @__PURE__ */ jsx(TableCell, {
              className: "font-mono text-xs text-slate-500",
              children: item.hsnCode || "-"
            }), /* @__PURE__ */ jsxs(TableCell, {
              className: "text-right font-medium",
              children: ["₹", item.monthlyRentRate]
            }), /* @__PURE__ */ jsxs(TableCell, {
              className: "text-right text-slate-500",
              children: [item.weight, " kg"]
            }), /* @__PURE__ */ jsx(TableCell, {
              children: /* @__PURE__ */ jsx(Button, {
                variant: "ghost",
                size: "icon",
                onClick: () => handleEdit(item),
                children: /* @__PURE__ */ jsx(Pencil, {
                  className: "h-4 w-4 text-slate-400"
                })
              })
            })]
          }, item._id))
        })]
      })
    })]
  });
});
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: items,
  meta: meta$j
}, Symbol.toStringTag, { value: "Module" }));
function meta$i({}) {
  return [{
    title: "Item Groups - ScaffRent"
  }];
}
const groupSchema = z.object({
  name: z.string().min(2, "Group Name required"),
  description: z.string().optional()
});
const itemGroups = UNSAFE_withComponentProps(function ItemGroups() {
  const [groups, setGroups] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const {
    register: register2,
    handleSubmit,
    reset,
    setValue,
    formState: {
      errors
    }
  } = useForm({
    resolver: zodResolver(groupSchema)
  });
  const fetchGroups = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("/api/masters/groups", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (res.ok) setGroups(await res.json());
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchGroups();
  }, []);
  const handleEdit = (grp) => {
    setEditingId(grp._id);
    setValue("name", grp.name);
    setValue("description", grp.description);
    setOpen(true);
  };
  const handleAdd = () => {
    setEditingId(null);
    reset({
      name: "",
      description: ""
    });
    setOpen(true);
  };
  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    const url = editingId ? `/api/masters/groups/${editingId}` : "/api/masters/groups";
    const method = editingId ? "PUT" : "POST";
    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        toast.success(editingId ? "Group Updated" : "Group Created");
        setOpen(false);
        fetchGroups();
      } else {
        toast.error("Failed to save");
      }
    } catch (e) {
      toast.error("Server Error");
    }
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "flex justify-between items-center",
      children: [/* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-2xl font-bold",
          children: "Item Groups"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-muted-foreground",
          children: "Manage product categories."
        })]
      }), /* @__PURE__ */ jsxs(Button, {
        onClick: handleAdd,
        className: "hover-card-glow bg-orange-600",
        children: [/* @__PURE__ */ jsx(Plus, {
          className: "mr-2 h-4 w-4"
        }), " Add Group"]
      })]
    }), /* @__PURE__ */ jsx(Dialog, {
      open,
      onOpenChange: setOpen,
      children: /* @__PURE__ */ jsxs(DialogContent, {
        className: "sm:max-w-[425px]",
        children: [/* @__PURE__ */ jsx(DialogHeader, {
          children: /* @__PURE__ */ jsx(DialogTitle, {
            children: editingId ? "Edit Group" : "Add New Group"
          })
        }), /* @__PURE__ */ jsxs("form", {
          onSubmit: handleSubmit(onSubmit),
          className: "space-y-4 py-2",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "space-y-2",
            children: [/* @__PURE__ */ jsx(Label, {
              children: "Group Name"
            }), /* @__PURE__ */ jsx(Input, {
              ...register2("name"),
              placeholder: "e.g. Cuplock System"
            }), errors.name && /* @__PURE__ */ jsx("span", {
              className: "text-red-500 text-xs",
              children: errors.name.message
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-2",
            children: [/* @__PURE__ */ jsx(Label, {
              children: "Description"
            }), /* @__PURE__ */ jsx(Input, {
              ...register2("description"),
              placeholder: "Optional description"
            })]
          }), /* @__PURE__ */ jsx(DialogFooter, {
            children: /* @__PURE__ */ jsx(Button, {
              type: "submit",
              className: "hover-card-glow bg-orange-600 w-full",
              children: editingId ? "Update" : "Save"
            })
          })]
        })]
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "grid gap-10 md:grid-cols-3 lg:grid-cols-4",
      children: groups.map((grp) => /* @__PURE__ */ jsx(Card, {
        className: "relative hover-card-glow hover:shadow-md transition-all relative",
        children: /* @__PURE__ */ jsxs(CardContent, {
          className: "p-5 flex items-center justify-between",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "flex items-center gap-3",
            children: [/* @__PURE__ */ jsx("div", {
              className: "h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600",
              children: /* @__PURE__ */ jsx(Layers, {
                size: 20
              })
            }), /* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("h4", {
                className: "font-bold text-slate-900",
                children: grp.name
              }), /* @__PURE__ */ jsx("p", {
                className: "text-xs text-slate-500",
                children: grp.description || "No description"
              })]
            })]
          }), /* @__PURE__ */ jsx(Button, {
            variant: "ghost",
            size: "icon",
            onClick: () => handleEdit(grp),
            children: /* @__PURE__ */ jsx(Pencil, {
              className: "h-4 w-4 text-slate-400"
            })
          })]
        })
      }, grp._id))
    })]
  });
});
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: itemGroups,
  meta: meta$i
}, Symbol.toStringTag, { value: "Module" }));
function meta$h({}) {
  return [{
    title: "Vendors - ScaffRent"
  }];
}
const vendorSchema = z.object({
  name: z.string().min(2, "Vendor Name is required"),
  contactPerson: z.string().optional(),
  mob1: z.string().min(10, "Mobile 1 is required"),
  mob2: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  billingAddress: z.string().optional(),
  billingState: z.string().optional(),
  shippingAddress: z.string().optional(),
  shippingState: z.string().optional(),
  gstn: z.string().toUpperCase().optional().or(z.literal("")).refine((val) => !val || validateGSTN(val), {
    message: "Invalid GSTN Checksum"
  }),
  pan: z.string().toUpperCase().optional().or(z.literal("")).refine((val) => !val || validatePAN(val), {
    message: "Invalid PAN Format"
  }),
  currency: z.string().optional()
});
const vendors = UNSAFE_withComponentProps(function Vendors() {
  const [vendors2, setVendors] = useState([]);
  const [currencies2, setCurrencies] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const {
    register: register2,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: {
      errors
    }
  } = useForm({
    resolver: zodResolver(vendorSchema)
  });
  const fetchMasters = async () => {
    const token = localStorage.getItem("token");
    const headers = {
      "Authorization": `Bearer ${token}`
    };
    const [venRes, curRes] = await Promise.all([fetch("/api/masters/vendors", {
      headers
    }), fetch("/api/masters/currencies", {
      headers
    })]);
    if (venRes.ok) setVendors(await venRes.json());
    if (curRes.ok) setCurrencies(await curRes.json());
  };
  useEffect(() => {
    fetchMasters();
  }, []);
  const handleEdit = (v, e) => {
    e.stopPropagation();
    setEditingId(v._id);
    setValue("name", v.name);
    setValue("contactPerson", v.contactPerson);
    setValue("mob1", v.mob1);
    setValue("mob2", v.mob2);
    setValue("email", v.email);
    setValue("billingAddress", v.billingAddress);
    setValue("billingState", v.billingState);
    setValue("shippingAddress", v.shippingAddress);
    setValue("shippingState", v.shippingState);
    setValue("gstn", v.gstn);
    setValue("pan", v.pan);
    setValue("currency", v.currency?._id || "");
    setIsOpen(true);
  };
  const handleAdd = () => {
    setEditingId(null);
    reset({
      name: "",
      contactPerson: "",
      mob1: "",
      mob2: "",
      email: "",
      billingAddress: "",
      billingState: "",
      shippingAddress: "",
      shippingState: "",
      gstn: "",
      pan: "",
      currency: ""
    });
    setIsOpen(true);
  };
  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    const url = editingId ? `/api/masters/vendors/${editingId}` : "/api/masters/vendors";
    const method = editingId ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      toast.success(editingId ? "Updated" : "Created");
      setIsOpen(false);
      fetchMasters();
    }
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "flex justify-between items-center",
      children: [/* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-2xl font-bold",
          children: "Vendor Master"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-muted-foreground",
          children: "Manage suppliers."
        })]
      }), /* @__PURE__ */ jsxs(Button, {
        onClick: handleAdd,
        className: "hover-card-glow bg-orange-600",
        children: [/* @__PURE__ */ jsx(Plus, {
          className: "mr-2 h-4 w-4"
        }), " Add Vendor"]
      })]
    }), /* @__PURE__ */ jsx(Dialog, {
      open: isOpen,
      onOpenChange: setIsOpen,
      children: /* @__PURE__ */ jsxs(DialogContent, {
        className: "sm:max-w-[650px] max-h-[90vh] overflow-y-auto",
        children: [/* @__PURE__ */ jsx(DialogHeader, {
          children: /* @__PURE__ */ jsxs(DialogTitle, {
            children: [editingId ? "Edit" : "Add", " Vendor"]
          })
        }), /* @__PURE__ */ jsxs("form", {
          onSubmit: handleSubmit(onSubmit),
          className: "space-y-4 py-2",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "grid grid-cols-2 gap-4",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [/* @__PURE__ */ jsx(Label, {
                children: "Vendor Name"
              }), /* @__PURE__ */ jsx(Input, {
                ...register2("name")
              }), errors.name && /* @__PURE__ */ jsx("span", {
                className: "text-red-500 text-xs",
                children: errors.name.message
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [/* @__PURE__ */ jsx(Label, {
                children: "Currency"
              }), /* @__PURE__ */ jsx(Controller, {
                name: "currency",
                control,
                render: ({
                  field
                }) => /* @__PURE__ */ jsxs(Select, {
                  onValueChange: field.onChange,
                  value: field.value,
                  children: [/* @__PURE__ */ jsx(SelectTrigger, {
                    children: /* @__PURE__ */ jsx(SelectValue, {
                      placeholder: "Select Currency"
                    })
                  }), /* @__PURE__ */ jsx(SelectContent, {
                    children: currencies2.map((c) => /* @__PURE__ */ jsxs(SelectItem, {
                      value: c._id,
                      children: [c.code, " (", c.symbol, ")"]
                    }, c._id))
                  })]
                })
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "grid grid-cols-2 gap-4",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [/* @__PURE__ */ jsx(Label, {
                children: "Contact Person"
              }), /* @__PURE__ */ jsx(Input, {
                ...register2("contactPerson")
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [/* @__PURE__ */ jsx(Label, {
                children: "Email"
              }), /* @__PURE__ */ jsx(Input, {
                ...register2("email")
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "grid grid-cols-2 gap-4",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [/* @__PURE__ */ jsx(Label, {
                children: "Mobile 1"
              }), /* @__PURE__ */ jsx(Input, {
                ...register2("mob1")
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [/* @__PURE__ */ jsx(Label, {
                children: "Mobile 2"
              }), /* @__PURE__ */ jsx(Input, {
                ...register2("mob2")
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "grid grid-cols-2 gap-4",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [/* @__PURE__ */ jsx(Label, {
                children: "GSTN"
              }), /* @__PURE__ */ jsx(Input, {
                ...register2("gstn"),
                className: "uppercase",
                maxLength: 15,
                onChange: (e) => setValue("gstn", e.target.value.toUpperCase(), {
                  shouldValidate: true
                })
              }), errors.gstn && /* @__PURE__ */ jsx("span", {
                className: "text-red-500 text-xs",
                children: errors.gstn.message
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [/* @__PURE__ */ jsx(Label, {
                children: "PAN"
              }), /* @__PURE__ */ jsx(Input, {
                ...register2("pan"),
                className: "uppercase",
                maxLength: 10,
                onChange: (e) => setValue("pan", e.target.value.toUpperCase(), {
                  shouldValidate: true
                })
              }), errors.pan && /* @__PURE__ */ jsx("span", {
                className: "text-red-500 text-xs",
                children: errors.pan.message
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-2 p-3 bg-slate-50 rounded-md border",
            children: [/* @__PURE__ */ jsxs(Label, {
              className: "font-bold flex items-center gap-2",
              children: [/* @__PURE__ */ jsx(CreditCard, {
                className: "h-4 w-4"
              }), " Billing"]
            }), /* @__PURE__ */ jsxs("div", {
              className: "grid grid-cols-3 gap-2 mt-1",
              children: [/* @__PURE__ */ jsx("div", {
                className: "col-span-2",
                children: /* @__PURE__ */ jsx(Input, {
                  ...register2("billingAddress"),
                  placeholder: "Address"
                })
              }), /* @__PURE__ */ jsx("div", {
                children: /* @__PURE__ */ jsx(Input, {
                  ...register2("billingState"),
                  placeholder: "State"
                })
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-2 p-3 bg-slate-50 rounded-md border",
            children: [/* @__PURE__ */ jsxs(Label, {
              className: "font-bold flex items-center gap-2",
              children: [/* @__PURE__ */ jsx(Truck, {
                className: "h-4 w-4"
              }), " Shipping"]
            }), /* @__PURE__ */ jsxs("div", {
              className: "grid grid-cols-3 gap-2 mt-1",
              children: [/* @__PURE__ */ jsx("div", {
                className: "col-span-2",
                children: /* @__PURE__ */ jsx(Input, {
                  ...register2("shippingAddress"),
                  placeholder: "Address"
                })
              }), /* @__PURE__ */ jsx("div", {
                children: /* @__PURE__ */ jsx(Input, {
                  ...register2("shippingState"),
                  placeholder: "State"
                })
              })]
            })]
          }), /* @__PURE__ */ jsx(DialogFooter, {
            children: /* @__PURE__ */ jsx(Button, {
              type: "submit",
              className: "hover-card-glow bg-orange-600 w-full",
              children: editingId ? "Update" : "Save"
            })
          })]
        })]
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "grid gap-10 md:grid-cols-3 lg:grid-cols-4",
      children: vendors2.map((v) => /* @__PURE__ */ jsx(Card, {
        className: "relative hover-card-glow hover:shadow-md transition-all",
        children: /* @__PURE__ */ jsxs(CardContent, {
          className: "p-5",
          children: [/* @__PURE__ */ jsx(Button, {
            variant: "ghost",
            size: "icon",
            className: "absolute top-2 right-2",
            onClick: (e) => handleEdit(v, e),
            children: /* @__PURE__ */ jsx(Pencil, {
              className: "h-4 w-4"
            })
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex justify-between items-start",
            children: [/* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("span", {
                className: "text-xs font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded-full",
                children: v.code
              }), /* @__PURE__ */ jsx("h4", {
                className: "font-bold text-lg mt-3",
                children: v.name
              })]
            }), /* @__PURE__ */ jsx(Store, {
              className: "text-slate-200 h-8 w-8"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "mt-4 space-y-2 text-sm text-muted-foreground",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "flex items-center gap-2",
              children: [/* @__PURE__ */ jsx(MapPin, {
                className: "h-4 w-4"
              }), " ", v.billingState || v.billingAddress || "No Address"]
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex items-center gap-2",
              children: [/* @__PURE__ */ jsx(Phone, {
                className: "h-4 w-4"
              }), " ", v.mob1]
            })]
          })]
        })
      }, v._id))
    })]
  });
});
const route11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: vendors,
  meta: meta$h
}, Symbol.toStringTag, { value: "Module" }));
function meta$g({}) {
  return [{
    title: "Warehouses - ScaffRent"
  }];
}
const whSchema = z.object({
  name: z.string().min(2, "Name required"),
  address: z.string().optional()
});
const warehouses = UNSAFE_withComponentProps(function Warehouses() {
  const [warehouses2, setWarehouses] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const {
    register: register2,
    handleSubmit,
    reset,
    setValue
  } = useForm({
    resolver: zodResolver(whSchema)
  });
  const fetchWarehouses = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("/api/masters/warehouses", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    if (res.ok) setWarehouses(await res.json());
  };
  useEffect(() => {
    fetchWarehouses();
  }, []);
  const handleEdit = (wh) => {
    setEditingId(wh._id);
    setValue("name", wh.name);
    setValue("address", wh.address);
    setOpen(true);
  };
  const handleAdd = () => {
    setEditingId(null);
    reset({
      name: "",
      address: ""
    });
    setOpen(true);
  };
  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    const url = editingId ? `/api/masters/warehouses/${editingId}` : "/api/masters/warehouses";
    const method = editingId ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      toast.success("Saved!");
      setOpen(false);
      fetchWarehouses();
    }
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "flex justify-between items-center",
      children: [/* @__PURE__ */ jsx("h2", {
        className: "text-2xl font-bold",
        children: "Warehouses"
      }), /* @__PURE__ */ jsxs(Button, {
        onClick: handleAdd,
        className: "hover-card-glow bg-orange-600",
        children: [/* @__PURE__ */ jsx(Plus, {
          className: "mr-2 h-4 w-4"
        }), " Add Warehouse"]
      })]
    }), /* @__PURE__ */ jsx(Dialog, {
      open,
      onOpenChange: setOpen,
      children: /* @__PURE__ */ jsxs(DialogContent, {
        className: "sm:max-w-[425px]",
        children: [/* @__PURE__ */ jsx(DialogHeader, {
          children: /* @__PURE__ */ jsxs(DialogTitle, {
            children: [editingId ? "Edit" : "Add", " Warehouse"]
          })
        }), /* @__PURE__ */ jsxs("form", {
          onSubmit: handleSubmit(onSubmit),
          className: "space-y-4",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "space-y-2",
            children: [/* @__PURE__ */ jsx(Label, {
              children: "Name"
            }), /* @__PURE__ */ jsx(Input, {
              ...register2("name")
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-2",
            children: [/* @__PURE__ */ jsx(Label, {
              children: "Address"
            }), /* @__PURE__ */ jsx(Input, {
              ...register2("address")
            })]
          }), /* @__PURE__ */ jsx(DialogFooter, {
            children: /* @__PURE__ */ jsx(Button, {
              type: "submit",
              className: "hover-card-glow bg-orange-600 w-full",
              children: editingId ? "Update" : "Save"
            })
          })]
        })]
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "grid gap-10 md:grid-cols-3 lg:grid-cols-4",
      children: warehouses2.map((wh) => /* @__PURE__ */ jsx(Card, {
        className: "relative hover-card-glow hover:shadow-md transition-all",
        children: /* @__PURE__ */ jsxs(CardContent, {
          className: "p-5 flex items-center gap-4",
          children: [/* @__PURE__ */ jsx("div", {
            className: "h-10 w-10 bg-slate-100 flex items-center justify-center rounded",
            children: /* @__PURE__ */ jsx(Warehouse, {
              className: "text-slate-500"
            })
          }), /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("h4", {
              className: "font-bold",
              children: wh.name
            }), /* @__PURE__ */ jsx("p", {
              className: "text-xs text-slate-500",
              children: wh.code
            })]
          }), /* @__PURE__ */ jsx(Button, {
            variant: "ghost",
            size: "icon",
            className: "absolute top-2 right-2",
            onClick: () => handleEdit(wh),
            children: /* @__PURE__ */ jsx(Pencil, {
              className: "h-4 w-4"
            })
          })]
        })
      }, wh._id))
    })]
  });
});
const route12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: warehouses,
  meta: meta$g
}, Symbol.toStringTag, { value: "Module" }));
function meta$f({}) {
  return [{
    title: "Currency Master - ScaffRent"
  }];
}
const WORLD_CURRENCIES = [{
  code: "INR",
  name: "Indian Rupee",
  symbol: "₹"
}, {
  code: "USD",
  name: "US Dollar",
  symbol: "$"
}, {
  code: "EUR",
  name: "Euro",
  symbol: "€"
}, {
  code: "GBP",
  name: "British Pound",
  symbol: "£"
}, {
  code: "AED",
  name: "UAE Dirham",
  symbol: "د.إ"
}, {
  code: "SAR",
  name: "Saudi Riyal",
  symbol: "﷼"
}, {
  code: "JPY",
  name: "Japanese Yen",
  symbol: "¥"
}];
const curSchema = z.object({
  code: z.string().min(1, "Select a currency"),
  name: z.string(),
  symbol: z.string()
});
const currencies = UNSAFE_withComponentProps(function Currencies() {
  const [currencies2, setCurrencies] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const {
    control,
    handleSubmit,
    reset,
    setValue
  } = useForm({
    resolver: zodResolver(curSchema)
  });
  const fetchCurrencies = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("/api/masters/currencies", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    if (res.ok) setCurrencies(await res.json());
  };
  useEffect(() => {
    fetchCurrencies();
  }, []);
  const handleEdit = (cur) => {
    setEditingId(cur._id);
    setValue("code", cur.code);
    setValue("name", cur.name);
    setValue("symbol", cur.symbol);
    setOpen(true);
  };
  const handleAdd = () => {
    setEditingId(null);
    reset({
      code: "",
      name: "",
      symbol: ""
    });
    setOpen(true);
  };
  const onSelectCurrency = (code) => {
    const selected = WORLD_CURRENCIES.find((c) => c.code === code);
    if (selected) {
      setValue("code", selected.code);
      setValue("name", selected.name);
      setValue("symbol", selected.symbol);
    }
  };
  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    const url = editingId ? `/api/masters/currencies/${editingId}` : "/api/masters/currencies";
    const method = editingId ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      toast.success("Saved!");
      setOpen(false);
      fetchCurrencies();
    }
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "flex justify-between items-center",
      children: [/* @__PURE__ */ jsx("h2", {
        className: "text-2xl font-bold",
        children: "Currency Master"
      }), /* @__PURE__ */ jsxs(Button, {
        onClick: handleAdd,
        className: "hover-card-glow bg-orange-600",
        children: [/* @__PURE__ */ jsx(Plus, {
          className: "mr-2 h-4 w-4"
        }), " Add Currency"]
      })]
    }), /* @__PURE__ */ jsx(Dialog, {
      open,
      onOpenChange: setOpen,
      children: /* @__PURE__ */ jsxs(DialogContent, {
        className: "sm:max-w-[425px]",
        children: [/* @__PURE__ */ jsx(DialogHeader, {
          children: /* @__PURE__ */ jsxs(DialogTitle, {
            children: [editingId ? "Edit" : "Add", " Currency"]
          })
        }), /* @__PURE__ */ jsxs("form", {
          onSubmit: handleSubmit(onSubmit),
          className: "space-y-4",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "space-y-2",
            children: [/* @__PURE__ */ jsx(Label, {
              children: "Select Currency"
            }), /* @__PURE__ */ jsx(Controller, {
              name: "code",
              control,
              render: ({
                field
              }) => /* @__PURE__ */ jsxs(Select, {
                onValueChange: (val) => {
                  field.onChange(val);
                  onSelectCurrency(val);
                },
                value: field.value,
                children: [/* @__PURE__ */ jsx(SelectTrigger, {
                  children: /* @__PURE__ */ jsx(SelectValue, {
                    placeholder: "Select from list"
                  })
                }), /* @__PURE__ */ jsx(SelectContent, {
                  children: WORLD_CURRENCIES.map((c) => /* @__PURE__ */ jsxs(SelectItem, {
                    value: c.code,
                    children: [c.code, " - ", c.name, " (", c.symbol, ")"]
                  }, c.code))
                })]
              })
            })]
          }), /* @__PURE__ */ jsx(DialogFooter, {
            children: /* @__PURE__ */ jsx(Button, {
              type: "submit",
              className: "hover-card-glow bg-orange-600 w-full",
              children: editingId ? "Update" : "Save"
            })
          })]
        })]
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "grid gap-4 md:grid-cols-5 lg:grid-cols-5",
      children: currencies2.map((cur) => /* @__PURE__ */ jsx(Card, {
        className: "relative hover-card-glow hover:shadow-md transition-all",
        children: /* @__PURE__ */ jsxs(CardContent, {
          className: "p-5 flex items-center gap-4",
          children: [/* @__PURE__ */ jsx("div", {
            className: "h-10 w-10 bg-green-100 flex items-center justify-center rounded text-green-700 font-bold",
            children: cur.symbol
          }), /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("h4", {
              className: "font-bold",
              children: cur.code
            }), /* @__PURE__ */ jsx("p", {
              className: "text-xs text-slate-500",
              children: cur.name
            })]
          }), /* @__PURE__ */ jsx(Button, {
            variant: "ghost",
            size: "icon",
            className: "absolute top-2 right-2",
            onClick: () => handleEdit(cur),
            children: /* @__PURE__ */ jsx(Pencil, {
              className: "h-4 w-4"
            })
          })]
        })
      }, cur._id))
    })]
  });
});
const route13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: currencies,
  meta: meta$f
}, Symbol.toStringTag, { value: "Module" }));
function meta$e({}) {
  return [{
    title: "Material Inward - ScaffRent"
  }];
}
const inwardSchema = z.object({
  date: z.string(),
  reference: z.string().optional(),
  remark: z.string().optional(),
  warehouse: z.string().min(1, "Select Warehouse")
});
const inventoryInward = UNSAFE_withComponentProps(function MaterialInward() {
  const [warehouses2, setWarehouses] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [rows, setRows] = useState([]);
  const {
    register: register2,
    control,
    handleSubmit,
    reset,
    formState: {
      errors
    }
  } = useForm({
    resolver: zodResolver(inwardSchema),
    defaultValues: {
      date: format(/* @__PURE__ */ new Date(), "yyyy-MM-dd"),
      reference: "",
      remark: "",
      warehouse: ""
    }
  });
  useEffect(() => {
    const fetchMasters = async () => {
      const token = localStorage.getItem("token");
      const headers = {
        "Authorization": `Bearer ${token}`
      };
      try {
        const [whRes, itemRes] = await Promise.all([fetch("/api/masters/warehouses", {
          headers
        }), fetch("/api/masters/items", {
          headers
        })]);
        if (whRes.ok) setWarehouses(await whRes.json());
        if (itemRes.ok) setAllItems(await itemRes.json());
      } catch (e) {
        toast.error("Network Error");
      }
    };
    fetchMasters();
  }, []);
  const addRow = () => {
    setRows([...rows, {
      itemId: "",
      itemCode: "",
      itemName: "",
      unit: "",
      quantity: 0,
      rate: 0,
      amount: 0
    }]);
  };
  const removeRow = (index) => {
    const updated = [...rows];
    updated.splice(index, 1);
    setRows(updated);
  };
  const handleItemCodeChange = (index, code) => {
    const updated = [...rows];
    updated[index].itemCode = code;
    const foundItem = allItems.find((i) => i.code.toLowerCase() === code.toLowerCase());
    if (foundItem) {
      updated[index].itemId = foundItem._id;
      updated[index].itemName = foundItem.name;
      updated[index].unit = foundItem.unit;
      updated[index].rate = foundItem.purchaseRate || 0;
      updated[index].amount = updated[index].quantity * updated[index].rate;
    } else {
      updated[index].itemId = "";
      updated[index].itemName = "Item not found";
    }
    setRows(updated);
  };
  const handleCalcChange = (index, field, value) => {
    const val = parseFloat(value) || 0;
    const updated = [...rows];
    updated[index][field] = val;
    updated[index].amount = updated[index].quantity * updated[index].rate;
    setRows(updated);
  };
  const onSubmit = async (data) => {
    if (rows.length === 0 || rows.some((r) => !r.itemId)) {
      toast.error("Please add valid items to the grid");
      return;
    }
    const payload = {
      txnType: "INWARD",
      ...data,
      items: rows.map((r) => ({
        item: r.itemId,
        itemCode: r.itemCode,
        itemName: r.itemName,
        unit: r.unit,
        quantity: r.quantity,
        rate: r.rate,
        amount: r.amount
      }))
    };
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("/api/inventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const saved = await res.json();
        toast.success(`Document ${saved.docNo} Saved!`);
        reset();
        setRows([]);
      } else {
        toast.error("Failed to save");
      }
    } catch (e) {
      toast.error("Server Error");
    }
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
    children: [/* @__PURE__ */ jsx("div", {
      className: "flex justify-between items-center",
      children: /* @__PURE__ */ jsx("h2", {
        className: "text-2xl font-bold",
        children: "Material Inward"
      })
    }), /* @__PURE__ */ jsxs("form", {
      onSubmit: handleSubmit(onSubmit),
      className: "space-y-6",
      children: [/* @__PURE__ */ jsxs(Card, {
        children: [/* @__PURE__ */ jsx(CardHeader, {
          children: /* @__PURE__ */ jsx(CardTitle, {
            className: "text-base",
            children: "Document Details"
          })
        }), /* @__PURE__ */ jsxs(CardContent, {
          className: "grid grid-cols-1 md:grid-cols-4 gap-4",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "space-y-2",
            children: [/* @__PURE__ */ jsx(Label, {
              children: "Document Date"
            }), /* @__PURE__ */ jsx(Input, {
              type: "date",
              ...register2("date")
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-2",
            children: [/* @__PURE__ */ jsx(Label, {
              children: "Warehouse"
            }), /* @__PURE__ */ jsx(Controller, {
              name: "warehouse",
              control,
              render: ({
                field
              }) => /* @__PURE__ */ jsxs(Select, {
                onValueChange: field.onChange,
                value: field.value,
                children: [/* @__PURE__ */ jsx(SelectTrigger, {
                  children: /* @__PURE__ */ jsx(SelectValue, {
                    placeholder: "Select"
                  })
                }), /* @__PURE__ */ jsx(SelectContent, {
                  children: warehouses2.map((w) => /* @__PURE__ */ jsx(SelectItem, {
                    value: w._id,
                    children: w.name
                  }, w._id))
                })]
              })
            }), errors.warehouse && /* @__PURE__ */ jsx("span", {
              className: "text-red-500 text-xs",
              children: "Required"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-2",
            children: [/* @__PURE__ */ jsx(Label, {
              children: "Reference"
            }), /* @__PURE__ */ jsx(Input, {
              ...register2("reference"),
              placeholder: "Invoice / Challan Ref"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-2",
            children: [/* @__PURE__ */ jsx(Label, {
              children: "Remark"
            }), /* @__PURE__ */ jsx(Textarea, {
              ...register2("remark"),
              placeholder: "Optional notes",
              className: "h-10 min-h-[40px]"
            })]
          })]
        })]
      }), /* @__PURE__ */ jsx(Card, {
        children: /* @__PURE__ */ jsxs(CardContent, {
          className: "p-0",
          children: [/* @__PURE__ */ jsx("div", {
            className: "overflow-x-auto",
            children: /* @__PURE__ */ jsxs(Table, {
              className: "min-w-[800px]",
              children: [/* @__PURE__ */ jsx(TableHeader, {
                children: /* @__PURE__ */ jsxs(TableRow, {
                  className: "bg-slate-50",
                  children: [/* @__PURE__ */ jsx(TableHead, {
                    className: "w-[150px]",
                    children: "Item Code"
                  }), /* @__PURE__ */ jsx(TableHead, {
                    children: "Item Name"
                  }), /* @__PURE__ */ jsx(TableHead, {
                    className: "w-[100px]",
                    children: "Unit"
                  }), /* @__PURE__ */ jsx(TableHead, {
                    className: "w-[120px]",
                    children: "Quantity"
                  }), /* @__PURE__ */ jsx(TableHead, {
                    className: "w-[120px]",
                    children: "Rate"
                  }), /* @__PURE__ */ jsx(TableHead, {
                    className: "w-[120px]",
                    children: "Amount"
                  }), /* @__PURE__ */ jsx(TableHead, {
                    className: "w-[50px]"
                  })]
                })
              }), /* @__PURE__ */ jsx(TableBody, {
                children: rows.map((row, index) => /* @__PURE__ */ jsxs(TableRow, {
                  children: [/* @__PURE__ */ jsx(TableCell, {
                    children: /* @__PURE__ */ jsxs("div", {
                      className: "relative",
                      children: [/* @__PURE__ */ jsx(Input, {
                        value: row.itemCode,
                        onChange: (e) => handleItemCodeChange(index, e.target.value),
                        placeholder: "Type Code",
                        className: "uppercase"
                      }), /* @__PURE__ */ jsx(Search, {
                        className: "absolute right-2 top-2.5 h-4 w-4 text-slate-400"
                      })]
                    })
                  }), /* @__PURE__ */ jsx(TableCell, {
                    className: "text-sm font-medium text-slate-700",
                    children: row.itemName || "-"
                  }), /* @__PURE__ */ jsx(TableCell, {
                    className: "text-sm text-slate-500",
                    children: row.unit || "-"
                  }), /* @__PURE__ */ jsx(TableCell, {
                    children: /* @__PURE__ */ jsx(Input, {
                      type: "number",
                      value: row.quantity,
                      onChange: (e) => handleCalcChange(index, "quantity", e.target.value)
                    })
                  }), /* @__PURE__ */ jsx(TableCell, {
                    children: /* @__PURE__ */ jsx(Input, {
                      type: "number",
                      value: row.rate,
                      onChange: (e) => handleCalcChange(index, "rate", e.target.value)
                    })
                  }), /* @__PURE__ */ jsx(TableCell, {
                    children: /* @__PURE__ */ jsx(Input, {
                      value: row.amount,
                      disabled: true,
                      className: "bg-slate-50 font-bold"
                    })
                  }), /* @__PURE__ */ jsx(TableCell, {
                    children: /* @__PURE__ */ jsx(Button, {
                      type: "button",
                      variant: "ghost",
                      size: "icon",
                      onClick: () => removeRow(index),
                      children: /* @__PURE__ */ jsx(Trash2, {
                        className: "h-4 w-4 text-red-500"
                      })
                    })
                  })]
                }, index))
              })]
            })
          }), /* @__PURE__ */ jsx("div", {
            className: "p-4 bg-slate-50 border-t flex justify-center",
            children: /* @__PURE__ */ jsxs(Button, {
              type: "button",
              variant: "outline",
              onClick: addRow,
              className: "border-dashed border-slate-400 text-slate-600",
              children: [/* @__PURE__ */ jsx(Plus, {
                className: "mr-2 h-4 w-4"
              }), " Add Item Row"]
            })
          })]
        })
      }), /* @__PURE__ */ jsxs("div", {
        className: "flex justify-end gap-4",
        children: [/* @__PURE__ */ jsx(Button, {
          type: "button",
          variant: "outline",
          onClick: () => reset(),
          children: "Reset"
        }), /* @__PURE__ */ jsxs(Button, {
          type: "submit",
          className: "bg-orange-600 hover:bg-orange-700 w-40",
          children: [/* @__PURE__ */ jsx(Save, {
            className: "mr-2 h-4 w-4"
          }), " Save Inward"]
        })]
      })]
    })]
  });
});
const route14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: inventoryInward,
  meta: meta$e
}, Symbol.toStringTag, { value: "Module" }));
function meta$d({}) {
  return [{
    title: "Material Outward - ScaffRent"
  }];
}
const outwardSchema = z.object({
  date: z.string(),
  reference: z.string().optional(),
  remark: z.string().optional(),
  warehouse: z.string().min(1, "Select Warehouse")
});
const inventoryOutward = UNSAFE_withComponentProps(function MaterialOutward() {
  const [warehouses2, setWarehouses] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [rows, setRows] = useState([]);
  const {
    register: register2,
    control,
    handleSubmit,
    reset,
    formState: {
      errors
    }
  } = useForm({
    resolver: zodResolver(outwardSchema),
    defaultValues: {
      date: format(/* @__PURE__ */ new Date(), "yyyy-MM-dd"),
      reference: "",
      remark: "",
      warehouse: ""
    }
  });
  useEffect(() => {
    const fetchMasters = async () => {
      const token = localStorage.getItem("token");
      const headers = {
        "Authorization": `Bearer ${token}`
      };
      try {
        const [whRes, itemRes] = await Promise.all([fetch("/api/masters/warehouses", {
          headers
        }), fetch("/api/masters/items", {
          headers
        })]);
        if (whRes.ok) setWarehouses(await whRes.json());
        if (itemRes.ok) setAllItems(await itemRes.json());
      } catch (e) {
        toast.error("Network Error");
      }
    };
    fetchMasters();
  }, []);
  const addRow = () => {
    setRows([...rows, {
      itemId: "",
      itemCode: "",
      itemName: "",
      unit: "",
      quantity: 0,
      rate: 0,
      amount: 0
    }]);
  };
  const removeRow = (index) => {
    const updated = [...rows];
    updated.splice(index, 1);
    setRows(updated);
  };
  const handleItemCodeChange = (index, code) => {
    const updated = [...rows];
    updated[index].itemCode = code;
    const foundItem = allItems.find((i) => i.code.toLowerCase() === code.toLowerCase());
    if (foundItem) {
      updated[index].itemId = foundItem._id;
      updated[index].itemName = foundItem.name;
      updated[index].unit = foundItem.unit;
      updated[index].rate = foundItem.purchaseRate || 0;
      updated[index].amount = updated[index].quantity * updated[index].rate;
    } else {
      updated[index].itemId = "";
      updated[index].itemName = "Item not found";
    }
    setRows(updated);
  };
  const handleCalcChange = (index, field, value) => {
    const val = parseFloat(value) || 0;
    const updated = [...rows];
    updated[index][field] = val;
    updated[index].amount = updated[index].quantity * updated[index].rate;
    setRows(updated);
  };
  const onSubmit = async (data) => {
    if (rows.length === 0 || rows.some((r) => !r.itemId)) {
      toast.error("Please add valid items to the grid");
      return;
    }
    const payload = {
      txnType: "OUTWARD",
      // ✅ Logic for Outward
      ...data,
      items: rows.map((r) => ({
        item: r.itemId,
        itemCode: r.itemCode,
        itemName: r.itemName,
        unit: r.unit,
        quantity: r.quantity,
        rate: r.rate,
        amount: r.amount
      }))
    };
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("/api/inventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const saved = await res.json();
        toast.success(`Outward Doc ${saved.docNo} Saved!`);
        reset();
        setRows([]);
      } else {
        toast.error("Failed to save");
      }
    } catch (e) {
      toast.error("Server Error");
    }
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
    children: [/* @__PURE__ */ jsx("div", {
      className: "flex justify-between items-center",
      children: /* @__PURE__ */ jsxs("div", {
        className: "flex items-center gap-2 text-red-700",
        children: [/* @__PURE__ */ jsx(ArrowUpCircle, {
          className: "h-6 w-6"
        }), /* @__PURE__ */ jsx("h2", {
          className: "text-2xl font-bold",
          children: "Material Outward"
        })]
      })
    }), /* @__PURE__ */ jsxs("form", {
      onSubmit: handleSubmit(onSubmit),
      className: "space-y-6",
      children: [/* @__PURE__ */ jsxs(Card, {
        className: "border-red-100",
        children: [/* @__PURE__ */ jsx(CardHeader, {
          children: /* @__PURE__ */ jsx(CardTitle, {
            className: "text-base text-red-900",
            children: "Outward Details"
          })
        }), /* @__PURE__ */ jsxs(CardContent, {
          className: "grid grid-cols-1 md:grid-cols-4 gap-4",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "space-y-2",
            children: [/* @__PURE__ */ jsx(Label, {
              children: "Document Date"
            }), /* @__PURE__ */ jsx(Input, {
              type: "date",
              ...register2("date")
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-2",
            children: [/* @__PURE__ */ jsx(Label, {
              children: "From Warehouse"
            }), /* @__PURE__ */ jsx(Controller, {
              name: "warehouse",
              control,
              render: ({
                field
              }) => /* @__PURE__ */ jsxs(Select, {
                onValueChange: field.onChange,
                value: field.value,
                children: [/* @__PURE__ */ jsx(SelectTrigger, {
                  children: /* @__PURE__ */ jsx(SelectValue, {
                    placeholder: "Select"
                  })
                }), /* @__PURE__ */ jsx(SelectContent, {
                  children: warehouses2.map((w) => /* @__PURE__ */ jsx(SelectItem, {
                    value: w._id,
                    children: w.name
                  }, w._id))
                })]
              })
            }), errors.warehouse && /* @__PURE__ */ jsx("span", {
              className: "text-red-500 text-xs",
              children: "Required"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-2",
            children: [/* @__PURE__ */ jsx(Label, {
              children: "Reference"
            }), /* @__PURE__ */ jsx(Input, {
              ...register2("reference"),
              placeholder: "Order Ref / Reason"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-2",
            children: [/* @__PURE__ */ jsx(Label, {
              children: "Remark"
            }), /* @__PURE__ */ jsx(Textarea, {
              ...register2("remark"),
              placeholder: "Where is this going?",
              className: "h-10 min-h-[40px]"
            })]
          })]
        })]
      }), /* @__PURE__ */ jsx(Card, {
        children: /* @__PURE__ */ jsxs(CardContent, {
          className: "p-0",
          children: [/* @__PURE__ */ jsx("div", {
            className: "overflow-x-auto",
            children: /* @__PURE__ */ jsxs(Table, {
              className: "min-w-[800px]",
              children: [/* @__PURE__ */ jsx(TableHeader, {
                children: /* @__PURE__ */ jsxs(TableRow, {
                  className: "bg-slate-50",
                  children: [/* @__PURE__ */ jsx(TableHead, {
                    className: "w-[150px]",
                    children: "Item Code"
                  }), /* @__PURE__ */ jsx(TableHead, {
                    children: "Item Name"
                  }), /* @__PURE__ */ jsx(TableHead, {
                    className: "w-[100px]",
                    children: "Unit"
                  }), /* @__PURE__ */ jsx(TableHead, {
                    className: "w-[120px]",
                    children: "Quantity"
                  }), /* @__PURE__ */ jsx(TableHead, {
                    className: "w-[120px]",
                    children: "Rate"
                  }), /* @__PURE__ */ jsx(TableHead, {
                    className: "w-[120px]",
                    children: "Amount"
                  }), /* @__PURE__ */ jsx(TableHead, {
                    className: "w-[50px]"
                  })]
                })
              }), /* @__PURE__ */ jsx(TableBody, {
                children: rows.map((row, index) => /* @__PURE__ */ jsxs(TableRow, {
                  children: [/* @__PURE__ */ jsx(TableCell, {
                    children: /* @__PURE__ */ jsxs("div", {
                      className: "relative",
                      children: [/* @__PURE__ */ jsx(Input, {
                        value: row.itemCode,
                        onChange: (e) => handleItemCodeChange(index, e.target.value),
                        placeholder: "Type Code",
                        className: "uppercase"
                      }), /* @__PURE__ */ jsx(Search, {
                        className: "absolute right-2 top-2.5 h-4 w-4 text-slate-400"
                      })]
                    })
                  }), /* @__PURE__ */ jsx(TableCell, {
                    className: "text-sm font-medium text-slate-700",
                    children: row.itemName || "-"
                  }), /* @__PURE__ */ jsx(TableCell, {
                    className: "text-sm text-slate-500",
                    children: row.unit || "-"
                  }), /* @__PURE__ */ jsx(TableCell, {
                    children: /* @__PURE__ */ jsx(Input, {
                      type: "number",
                      value: row.quantity,
                      onChange: (e) => handleCalcChange(index, "quantity", e.target.value)
                    })
                  }), /* @__PURE__ */ jsx(TableCell, {
                    children: /* @__PURE__ */ jsx(Input, {
                      type: "number",
                      value: row.rate,
                      onChange: (e) => handleCalcChange(index, "rate", e.target.value)
                    })
                  }), /* @__PURE__ */ jsx(TableCell, {
                    children: /* @__PURE__ */ jsx(Input, {
                      value: row.amount,
                      disabled: true,
                      className: "bg-slate-50 font-bold"
                    })
                  }), /* @__PURE__ */ jsx(TableCell, {
                    children: /* @__PURE__ */ jsx(Button, {
                      type: "button",
                      variant: "ghost",
                      size: "icon",
                      onClick: () => removeRow(index),
                      children: /* @__PURE__ */ jsx(Trash2, {
                        className: "h-4 w-4 text-red-500"
                      })
                    })
                  })]
                }, index))
              })]
            })
          }), /* @__PURE__ */ jsx("div", {
            className: "p-4 bg-slate-50 border-t flex justify-center",
            children: /* @__PURE__ */ jsxs(Button, {
              type: "button",
              variant: "outline",
              onClick: addRow,
              className: "border-dashed border-red-300 text-red-700 hover:bg-red-50",
              children: [/* @__PURE__ */ jsx(Plus, {
                className: "mr-2 h-4 w-4"
              }), " Add Item Row"]
            })
          })]
        })
      }), /* @__PURE__ */ jsxs("div", {
        className: "flex justify-end gap-4",
        children: [/* @__PURE__ */ jsx(Button, {
          type: "button",
          variant: "outline",
          onClick: () => reset(),
          children: "Reset"
        }), /* @__PURE__ */ jsxs(Button, {
          type: "submit",
          className: "bg-red-600 hover:bg-red-700 w-40",
          children: [/* @__PURE__ */ jsx(Save, {
            className: "mr-2 h-4 w-4"
          }), " Save Outward"]
        })]
      })]
    })]
  });
});
const route15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: inventoryOutward,
  meta: meta$d
}, Symbol.toStringTag, { value: "Module" }));
function meta$c({}) {
  return [{
    title: "Inventory Operations - ScaffRent"
  }];
}
const txnSchema = z.object({
  date: z.string(),
  reference: z.string().optional(),
  remark: z.string().optional(),
  warehouse: z.string().min(1, "Select Warehouse")
});
function InventoryModule({
  type,
  warehouses: warehouses2,
  items: items2
}) {
  const [rows, setRows] = useState([]);
  const [history, setHistory] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const isInward = type === "INWARD";
  const themeColor = isInward ? "text-orange-600" : "text-red-600";
  const btnColor = isInward ? "bg-orange-600 hover:bg-orange-700" : "bg-red-600 hover:bg-red-700";
  const borderColor = isInward ? "border-orange-200" : "border-red-200";
  const badgeColor = isInward ? "bg-orange-100 text-orange-800" : "bg-red-100 text-red-800";
  const {
    register: register2,
    control,
    handleSubmit,
    reset,
    formState: {
      errors
    }
  } = useForm({
    resolver: zodResolver(txnSchema),
    defaultValues: {
      date: format(/* @__PURE__ */ new Date(), "yyyy-MM-dd"),
      reference: "",
      remark: "",
      warehouse: ""
    }
  });
  const fetchHistory = useCallback(async (pageNum) => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`/api/inventory?type=${type}&page=${pageNum}&limit=5`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setHistory(data.transactions);
        setTotalPages(data.pagination.totalPages);
        setPage(data.pagination.currentPage);
      }
    } catch (e) {
      console.error("History fetch error");
    }
    setIsLoading(false);
  }, [type]);
  useEffect(() => {
    fetchHistory(1);
  }, [fetchHistory]);
  const addRow = () => {
    setRows([...rows, {
      itemId: "",
      itemCode: "",
      itemName: "",
      unit: "",
      quantity: 0,
      rate: 0,
      amount: 0
    }]);
  };
  const removeRow = (index) => {
    const updated = [...rows];
    updated.splice(index, 1);
    setRows(updated);
  };
  const handleItemCodeChange = (index, code) => {
    const updated = [...rows];
    updated[index].itemCode = code;
    const foundItem = items2.find((i) => i.code.toLowerCase() === code.toLowerCase());
    if (foundItem) {
      updated[index].itemId = foundItem._id;
      updated[index].itemName = foundItem.name;
      updated[index].unit = foundItem.unit;
      updated[index].rate = foundItem.purchaseRate || 0;
      updated[index].amount = updated[index].quantity * updated[index].rate;
    } else {
      updated[index].itemId = "";
      updated[index].itemName = "Item not found";
    }
    setRows(updated);
  };
  const handleCalcChange = (index, field, value) => {
    const val = parseFloat(value) || 0;
    const updated = [...rows];
    updated[index][field] = val;
    updated[index].amount = updated[index].quantity * updated[index].rate;
    setRows(updated);
  };
  const onSubmit = async (data) => {
    if (rows.length === 0 || rows.some((r) => !r.itemId)) {
      toast.error("Please add valid items to the grid");
      return;
    }
    const payload = {
      txnType: type,
      ...data,
      items: rows.map((r) => ({
        item: r.itemId,
        itemCode: r.itemCode,
        itemName: r.itemName,
        unit: r.unit,
        quantity: r.quantity,
        rate: r.rate,
        amount: r.amount
      }))
    };
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("/api/inventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const saved = await res.json();
        toast.success(`Doc ${saved.docNo} Saved!`);
        reset();
        setRows([]);
        fetchHistory(1);
      } else {
        const err = await res.json();
        toast.error(err.message || "Failed to save");
      }
    } catch (e) {
      toast.error("Server Error");
    }
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-8",
    children: [/* @__PURE__ */ jsxs("form", {
      onSubmit: handleSubmit(onSubmit),
      className: "space-y-6 pt-4 animate-in fade-in slide-in-from-bottom-4",
      children: [/* @__PURE__ */ jsxs(Card, {
        className: `hover-card-glow border-t-4 ${borderColor}`,
        children: [/* @__PURE__ */ jsx(CardHeader, {
          children: /* @__PURE__ */ jsxs(CardTitle, {
            className: `text-base flex items-center gap-2 ${themeColor}`,
            children: [isInward ? /* @__PURE__ */ jsx(ArrowDownCircle, {
              size: 20
            }) : /* @__PURE__ */ jsx(ArrowUpCircle, {
              size: 20
            }), isInward ? "New Material Inward" : "New Material Outward"]
          })
        }), /* @__PURE__ */ jsxs(CardContent, {
          className: "grid grid-cols-1 md:grid-cols-4 gap-4",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "space-y-2",
            children: [/* @__PURE__ */ jsx(Label, {
              children: "Date"
            }), /* @__PURE__ */ jsx(Input, {
              type: "date",
              ...register2("date")
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-2",
            children: [/* @__PURE__ */ jsx(Label, {
              children: isInward ? "To Warehouse" : "From Warehouse"
            }), /* @__PURE__ */ jsx(Controller, {
              name: "warehouse",
              control,
              render: ({
                field
              }) => /* @__PURE__ */ jsxs(Select, {
                onValueChange: field.onChange,
                value: field.value,
                children: [/* @__PURE__ */ jsx(SelectTrigger, {
                  children: /* @__PURE__ */ jsx(SelectValue, {
                    placeholder: "Select"
                  })
                }), /* @__PURE__ */ jsx(SelectContent, {
                  children: warehouses2.map((w) => /* @__PURE__ */ jsx(SelectItem, {
                    value: w._id,
                    children: w.name
                  }, w._id))
                })]
              })
            }), errors.warehouse && /* @__PURE__ */ jsx("span", {
              className: "text-red-500 text-xs",
              children: "Required"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-2",
            children: [/* @__PURE__ */ jsx(Label, {
              children: "Reference"
            }), /* @__PURE__ */ jsx(Input, {
              ...register2("reference"),
              placeholder: "Ref / Bill No"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-2",
            children: [/* @__PURE__ */ jsx(Label, {
              children: "Remark"
            }), /* @__PURE__ */ jsx(Textarea, {
              ...register2("remark"),
              placeholder: "Notes...",
              className: "h-10 min-h-[40px]"
            })]
          })]
        })]
      }), /* @__PURE__ */ jsx(Card, {
        className: "hover-card-glow",
        children: /* @__PURE__ */ jsxs(CardContent, {
          className: "p-0",
          children: [/* @__PURE__ */ jsx("div", {
            className: "overflow-x-auto",
            children: /* @__PURE__ */ jsxs(Table, {
              className: "min-w-[800px]",
              children: [/* @__PURE__ */ jsx(TableHeader, {
                children: /* @__PURE__ */ jsxs(TableRow, {
                  className: "bg-slate-50",
                  children: [/* @__PURE__ */ jsx(TableHead, {
                    className: "w-[150px]",
                    children: "Code"
                  }), /* @__PURE__ */ jsx(TableHead, {
                    children: "Item Name"
                  }), /* @__PURE__ */ jsx(TableHead, {
                    className: "w-[100px]",
                    children: "Unit"
                  }), /* @__PURE__ */ jsx(TableHead, {
                    className: "w-[120px]",
                    children: "Qty"
                  }), /* @__PURE__ */ jsx(TableHead, {
                    className: "w-[120px]",
                    children: "Rate"
                  }), /* @__PURE__ */ jsx(TableHead, {
                    className: "w-[120px]",
                    children: "Amount"
                  }), /* @__PURE__ */ jsx(TableHead, {
                    className: "w-[50px]"
                  })]
                })
              }), /* @__PURE__ */ jsx(TableBody, {
                children: rows.map((row, index) => /* @__PURE__ */ jsxs(TableRow, {
                  children: [/* @__PURE__ */ jsx(TableCell, {
                    children: /* @__PURE__ */ jsxs("div", {
                      className: "relative",
                      children: [/* @__PURE__ */ jsx(Input, {
                        value: row.itemCode,
                        onChange: (e) => handleItemCodeChange(index, e.target.value),
                        placeholder: "Code",
                        className: "uppercase"
                      }), /* @__PURE__ */ jsx(Search, {
                        className: "absolute right-2 top-2.5 h-4 w-4 text-slate-400"
                      })]
                    })
                  }), /* @__PURE__ */ jsx(TableCell, {
                    className: "text-sm font-medium text-slate-700",
                    children: row.itemName || "-"
                  }), /* @__PURE__ */ jsx(TableCell, {
                    className: "text-sm text-slate-500",
                    children: row.unit || "-"
                  }), /* @__PURE__ */ jsx(TableCell, {
                    children: /* @__PURE__ */ jsx(Input, {
                      type: "number",
                      value: row.quantity,
                      onChange: (e) => handleCalcChange(index, "quantity", e.target.value)
                    })
                  }), /* @__PURE__ */ jsx(TableCell, {
                    children: /* @__PURE__ */ jsx(Input, {
                      type: "number",
                      value: row.rate,
                      onChange: (e) => handleCalcChange(index, "rate", e.target.value)
                    })
                  }), /* @__PURE__ */ jsx(TableCell, {
                    children: /* @__PURE__ */ jsx(Input, {
                      value: row.amount,
                      disabled: true,
                      className: "bg-slate-50 font-bold"
                    })
                  }), /* @__PURE__ */ jsx(TableCell, {
                    children: /* @__PURE__ */ jsx(Button, {
                      type: "button",
                      variant: "ghost",
                      size: "icon",
                      onClick: () => removeRow(index),
                      children: /* @__PURE__ */ jsx(Trash2, {
                        className: "h-4 w-4 text-red-500"
                      })
                    })
                  })]
                }, index))
              })]
            })
          }), /* @__PURE__ */ jsx("div", {
            className: "p-4 bg-slate-50 border-t flex justify-center",
            children: /* @__PURE__ */ jsxs(Button, {
              type: "button",
              variant: "outline",
              onClick: addRow,
              className: "border-dashed border-slate-400 text-slate-600",
              children: [/* @__PURE__ */ jsx(Plus, {
                className: "mr-2 h-4 w-4"
              }), " Add Item"]
            })
          })]
        })
      }), /* @__PURE__ */ jsxs("div", {
        className: "flex justify-end gap-4",
        children: [/* @__PURE__ */ jsx(Button, {
          type: "button",
          className: "hover-card-glow",
          onClick: () => reset(),
          children: "Reset"
        }), /* @__PURE__ */ jsxs(Button, {
          type: "submit",
          className: `hover-card-glow w-40 ${btnColor}`,
          children: [/* @__PURE__ */ jsx(Save, {
            className: "mr-2 h-4 w-4"
          }), " Save"]
        })]
      })]
    }), /* @__PURE__ */ jsxs(Card, {
      className: "hover-card-glow",
      children: [/* @__PURE__ */ jsxs(CardHeader, {
        children: [/* @__PURE__ */ jsxs(CardTitle, {
          className: "text-lg flex items-center gap-2",
          children: [/* @__PURE__ */ jsx(Clock, {
            className: "h-5 w-5 text-slate-500"
          }), " Recent Transactions"]
        }), /* @__PURE__ */ jsxs(CardDescription, {
          children: ["History of ", isInward ? "inward" : "outward", " movements."]
        })]
      }), /* @__PURE__ */ jsxs(CardContent, {
        children: [/* @__PURE__ */ jsx("div", {
          className: "rounded-md border overflow-x-auto",
          children: /* @__PURE__ */ jsxs(Table, {
            children: [/* @__PURE__ */ jsx(TableHeader, {
              children: /* @__PURE__ */ jsxs(TableRow, {
                className: "bg-slate-50",
                children: [/* @__PURE__ */ jsx(TableHead, {
                  children: "Doc No"
                }), /* @__PURE__ */ jsx(TableHead, {
                  children: "Fiscal Year"
                }), /* @__PURE__ */ jsx(TableHead, {
                  children: "Date"
                }), /* @__PURE__ */ jsx(TableHead, {
                  children: "Warehouse"
                }), /* @__PURE__ */ jsx(TableHead, {
                  children: "Reference"
                }), /* @__PURE__ */ jsx(TableHead, {
                  className: "text-right",
                  children: "Total Qty"
                })]
              })
            }), /* @__PURE__ */ jsx(TableBody, {
              children: isLoading ? /* @__PURE__ */ jsx(TableRow, {
                children: /* @__PURE__ */ jsx(TableCell, {
                  colSpan: 6,
                  className: "text-center h-24",
                  children: "Loading..."
                })
              }) : history.length === 0 ? /* @__PURE__ */ jsx(TableRow, {
                children: /* @__PURE__ */ jsx(TableCell, {
                  colSpan: 6,
                  className: "text-center h-24 text-slate-500",
                  children: "No recent transactions found."
                })
              }) : history.map((txn) => /* @__PURE__ */ jsxs(TableRow, {
                children: [/* @__PURE__ */ jsx(TableCell, {
                  className: "font-mono font-medium",
                  children: /* @__PURE__ */ jsx(Badge, {
                    variant: "outline",
                    className: badgeColor,
                    children: txn.docNo
                  })
                }), /* @__PURE__ */ jsx(TableCell, {
                  children: /* @__PURE__ */ jsx(Badge, {
                    variant: "secondary",
                    className: "font-mono text-xs",
                    children: txn.fiscalYear?.code || "N/A"
                  })
                }), /* @__PURE__ */ jsx(TableCell, {
                  children: new Date(txn.date).toLocaleDateString()
                }), /* @__PURE__ */ jsx(TableCell, {
                  children: txn.warehouse?.name || "Unknown"
                }), /* @__PURE__ */ jsx(TableCell, {
                  className: "text-slate-500 text-sm",
                  children: txn.reference || "-"
                }), /* @__PURE__ */ jsx(TableCell, {
                  className: "text-right font-medium",
                  children: txn.items?.reduce((sum, i) => sum + (i.quantity || 0), 0)
                })]
              }, txn._id))
            })]
          })
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex items-center justify-between mt-4",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "text-xs text-slate-500",
            children: ["Page ", page, " of ", totalPages]
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex gap-2",
            children: [/* @__PURE__ */ jsxs(Button, {
              variant: "outline",
              size: "sm",
              onClick: () => fetchHistory(page - 1),
              disabled: page <= 1 || isLoading,
              children: [/* @__PURE__ */ jsx(ChevronLeft, {
                className: "h-4 w-4"
              }), " Prev"]
            }), /* @__PURE__ */ jsxs(Button, {
              variant: "outline",
              size: "sm",
              onClick: () => fetchHistory(page + 1),
              disabled: page >= totalPages || isLoading,
              children: ["Next ", /* @__PURE__ */ jsx(ChevronRight, {
                className: "h-4 w-4"
              })]
            })]
          })]
        })]
      })]
    })]
  });
}
const inventory = UNSAFE_withComponentProps(function InventoryPage() {
  const [warehouses2, setWarehouses] = useState([]);
  const [items2, setItems] = useState([]);
  useEffect(() => {
    const fetchMasters = async () => {
      const token = localStorage.getItem("token");
      const headers = {
        "Authorization": `Bearer ${token}`
      };
      try {
        const [whRes, itemRes] = await Promise.all([fetch("/api/masters/warehouses", {
          headers
        }), fetch("/api/masters/items", {
          headers
        })]);
        if (whRes.ok) setWarehouses(await whRes.json());
        if (itemRes.ok) setItems(await itemRes.json());
      } catch (e) {
        toast.error("Network Error: Could not fetch masters");
      }
    };
    fetchMasters();
  }, []);
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
    children: [/* @__PURE__ */ jsx("div", {
      className: "flex flex-col md:flex-row md:items-center justify-between gap-4",
      children: /* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-2xl font-bold tracking-tight",
          children: "Inventory Operations"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-muted-foreground",
          children: "Manage material flow in and out of warehouses."
        })]
      })
    }), /* @__PURE__ */ jsxs(Tabs, {
      defaultValue: "inward",
      className: "w-full",
      children: [/* @__PURE__ */ jsxs(TabsList, {
        className: "grid w-full grid-cols-2 h-12 bg-slate-100 rounded-md border border-slate-200 mb-4 max-w-md",
        children: [/* @__PURE__ */ jsxs(TabsTrigger, {
          value: "inward",
          className: "data-[state=active]:bg-orange-100 data-[state=active]:text-orange-800 text-base",
          children: [/* @__PURE__ */ jsx(ArrowDownCircle, {
            className: "mr-2 h-5 w-5"
          }), " Material Inward"]
        }), /* @__PURE__ */ jsxs(TabsTrigger, {
          value: "outward",
          className: "data-[state=active]:bg-red-100 data-[state=active]:text-red-800 text-base",
          children: [/* @__PURE__ */ jsx(ArrowUpCircle, {
            className: "mr-2 h-5 w-5"
          }), " Material Outward"]
        })]
      }), /* @__PURE__ */ jsx(TabsContent, {
        value: "inward",
        children: /* @__PURE__ */ jsx(InventoryModule, {
          type: "INWARD",
          warehouses: warehouses2,
          items: items2
        })
      }), /* @__PURE__ */ jsx(TabsContent, {
        value: "outward",
        children: /* @__PURE__ */ jsx(InventoryModule, {
          type: "OUTWARD",
          warehouses: warehouses2,
          items: items2
        })
      })]
    })]
  });
});
const route16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: inventory,
  meta: meta$c
}, Symbol.toStringTag, { value: "Module" }));
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DayPicker,
    {
      showOutsideDays,
      className: cn("p-3", className),
      classNames: {
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames
      },
      components: {
        IconLeft: ({ ...props2 }) => /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" }),
        IconRight: ({ ...props2 }) => /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" })
      },
      ...props
    }
  );
}
Calendar.displayName = "Calendar";
const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverContent = React.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  PopoverPrimitive.Content,
  {
    ref,
    align,
    sideOffset,
    className: cn(
      "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;
function getIndianFinancialYear(date = /* @__PURE__ */ new Date()) {
  const year = date.getFullYear();
  const month = date.getMonth();
  let startYear;
  let endYear;
  if (month >= 3) {
    startYear = year;
    endYear = year + 1;
  } else {
    startYear = year - 1;
    endYear = year;
  }
  return {
    startYear,
    endYear,
    label: `FY-${startYear}-${String(endYear).slice(-2)}`,
    startDate: new Date(startYear, 3, 1),
    // April 1st
    endDate: new Date(endYear, 2, 31)
    // March 31st
  };
}
function meta$b({}) {
  return [{
    title: "Fiscal Years - ScaffRent"
  }];
}
const fySchema = z.object({
  fromDate: z.date(),
  toDate: z.date(),
  code: z.string(),
  name: z.string()
});
const fiscalYears = UNSAFE_withComponentProps(function FiscalYears() {
  const [years, setYears] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [preview, setPreview] = useState(null);
  const {
    control,
    handleSubmit,
    reset,
    setValue
  } = useForm({
    resolver: zodResolver(fySchema)
  });
  const handleDateSelect = (date, onChange) => {
    if (!date) return;
    const fy = getIndianFinancialYear(date);
    onChange(fy.startDate);
    setValue("toDate", fy.endDate);
    setValue("code", fy.label);
    setValue("name", `April ${fy.startYear} - March ${fy.endYear}`);
    setPreview({
      label: fy.label,
      start: format(fy.startDate, "dd MMM yyyy"),
      end: format(fy.endDate, "dd MMM yyyy")
    });
  };
  const fetchYears = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("/api/masters/fiscal-years", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    if (res.ok) setYears(await res.json());
  };
  useEffect(() => {
    fetchYears();
  }, []);
  const handleEdit = (fy) => {
    setEditingId(fy._id);
    const start = new Date(fy.fromDate);
    setValue("fromDate", start);
    setValue("toDate", new Date(fy.toDate));
    setValue("code", fy.code);
    setValue("name", fy.name);
    setPreview({
      label: fy.code,
      start: format(new Date(fy.fromDate), "dd MMM yyyy"),
      end: format(new Date(fy.toDate), "dd MMM yyyy")
    });
    setOpen(true);
  };
  const handleAdd = () => {
    setEditingId(null);
    setPreview(null);
    reset();
    setOpen(true);
  };
  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    const url = editingId ? `/api/masters/fiscal-years/${editingId}` : "/api/masters/fiscal-years";
    const method = editingId ? "PUT" : "POST";
    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        toast.success("Fiscal Year Saved");
        setOpen(false);
        fetchYears();
      } else {
        const err = await res.json();
        toast.error(err.message || "Failed to save");
      }
    } catch (e) {
      toast.error("Server Error");
    }
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "flex justify-between items-center",
      children: [/* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-2xl font-bold",
          children: "Fiscal Years"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-muted-foreground",
          children: "Manage financial periods (April - March)."
        })]
      }), /* @__PURE__ */ jsxs(Button, {
        onClick: handleAdd,
        className: "hover-card-glow bg-orange-600",
        children: [/* @__PURE__ */ jsx(Plus, {
          className: "mr-2 h-4 w-4"
        }), " Add Year"]
      })]
    }), /* @__PURE__ */ jsx(Dialog, {
      open,
      onOpenChange: setOpen,
      children: /* @__PURE__ */ jsxs(DialogContent, {
        className: "sm:max-w-[425px]",
        children: [/* @__PURE__ */ jsx(DialogHeader, {
          children: /* @__PURE__ */ jsxs(DialogTitle, {
            children: [editingId ? "Edit" : "New", " Fiscal Year"]
          })
        }), /* @__PURE__ */ jsxs("form", {
          onSubmit: handleSubmit(onSubmit),
          className: "space-y-6 pt-2",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "space-y-2",
            children: [/* @__PURE__ */ jsx(Label, {
              children: "Select Any Date in the Year"
            }), /* @__PURE__ */ jsx(Controller, {
              name: "fromDate",
              control,
              render: ({
                field
              }) => /* @__PURE__ */ jsxs(Popover, {
                children: [/* @__PURE__ */ jsx(PopoverTrigger, {
                  asChild: true,
                  children: /* @__PURE__ */ jsxs(Button, {
                    variant: "outline",
                    className: cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground"),
                    children: [field.value ? format(field.value, "PPP") : /* @__PURE__ */ jsx("span", {
                      children: "Pick a date"
                    }), /* @__PURE__ */ jsx(CalendarIcon, {
                      className: "ml-auto h-4 w-4 opacity-50"
                    })]
                  })
                }), /* @__PURE__ */ jsx(PopoverContent, {
                  className: "w-auto p-0",
                  align: "start",
                  children: /* @__PURE__ */ jsx(Calendar, {
                    mode: "single",
                    selected: field.value,
                    onSelect: (date) => handleDateSelect(date, field.onChange),
                    initialFocus: true
                  })
                })]
              })
            }), /* @__PURE__ */ jsx("p", {
              className: "text-xs text-slate-500",
              children: "System will automatically snap to Indian FY (Apr 1 - Mar 31)."
            })]
          }), preview && /* @__PURE__ */ jsxs("div", {
            className: "bg-orange-50 border border-orange-200 rounded-lg p-4 space-y-2",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "flex items-center gap-2 text-orange-800 font-bold text-lg",
              children: [/* @__PURE__ */ jsx(CheckCircle2, {
                className: "h-5 w-5"
              }), preview.label]
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex justify-between text-sm text-slate-600 border-t border-orange-200 pt-2",
              children: [/* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("span", {
                  className: "block text-xs uppercase text-slate-400",
                  children: "Start Date"
                }), preview.start]
              }), /* @__PURE__ */ jsxs("div", {
                className: "text-right",
                children: [/* @__PURE__ */ jsx("span", {
                  className: "block text-xs uppercase text-slate-400",
                  children: "End Date"
                }), preview.end]
              })]
            })]
          }), /* @__PURE__ */ jsx(DialogFooter, {
            children: /* @__PURE__ */ jsx(Button, {
              type: "submit",
              className: "hover-card-glow bg-orange-600 w-full",
              children: "Confirm & Save"
            })
          })]
        })]
      })
    }), /* @__PURE__ */ jsx(Card, {
      className: "relative hover-card-glow overflow-x-auto",
      children: /* @__PURE__ */ jsx(CardContent, {
        className: "p-0",
        children: /* @__PURE__ */ jsxs(Table, {
          children: [/* @__PURE__ */ jsx(TableHeader, {
            children: /* @__PURE__ */ jsxs(TableRow, {
              className: "bg-slate-50",
              children: [/* @__PURE__ */ jsx(TableHead, {
                children: "Code"
              }), /* @__PURE__ */ jsx(TableHead, {
                children: "Period Name"
              }), /* @__PURE__ */ jsx(TableHead, {
                children: "Start Date"
              }), /* @__PURE__ */ jsx(TableHead, {
                children: "End Date"
              }), /* @__PURE__ */ jsx(TableHead, {
                className: "w-[50px]"
              })]
            })
          }), /* @__PURE__ */ jsx(TableBody, {
            children: years.length === 0 ? /* @__PURE__ */ jsx(TableRow, {
              children: /* @__PURE__ */ jsx(TableCell, {
                colSpan: 5,
                className: "text-center h-24 text-slate-400",
                children: "No years defined."
              })
            }) : years.map((fy) => /* @__PURE__ */ jsxs(TableRow, {
              children: [/* @__PURE__ */ jsx(TableCell, {
                className: "font-mono font-medium text-orange-700",
                children: fy.code
              }), /* @__PURE__ */ jsx(TableCell, {
                children: fy.name
              }), /* @__PURE__ */ jsx(TableCell, {
                children: new Date(fy.fromDate).toLocaleDateString()
              }), /* @__PURE__ */ jsx(TableCell, {
                children: new Date(fy.toDate).toLocaleDateString()
              }), /* @__PURE__ */ jsx(TableCell, {
                children: /* @__PURE__ */ jsx(Button, {
                  variant: "ghost",
                  size: "icon",
                  onClick: () => handleEdit(fy),
                  children: /* @__PURE__ */ jsx(Pencil, {
                    className: "h-4 w-4 text-slate-400"
                  })
                })
              })]
            }, fy._id))
          })]
        })
      })
    })]
  });
});
const route17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: fiscalYears,
  meta: meta$b
}, Symbol.toStringTag, { value: "Module" }));
function meta$a({}) {
  return [{
    title: "Tax Codes - ScaffRent"
  }];
}
const taxSchema = z.object({
  name: z.string().min(2, "Name required"),
  cgst: z.coerce.number().min(0),
  sgst: z.coerce.number().min(0),
  igst: z.coerce.number().min(0)
});
const taxCodes = UNSAFE_withComponentProps(function TaxCodes() {
  const [taxes, setTaxes] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const {
    register: register2,
    handleSubmit,
    reset,
    setValue,
    watch
  } = useForm({
    resolver: zodResolver(taxSchema),
    defaultValues: {
      name: "",
      cgst: 0,
      sgst: 0,
      igst: 0
    }
  });
  const formVals = watch();
  const totalRate = (Number(formVals.cgst) || 0) + (Number(formVals.sgst) || 0) + (Number(formVals.igst) || 0);
  const fetchTaxes = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("/api/masters/tax-codes", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    if (res.ok) setTaxes(await res.json());
  };
  useEffect(() => {
    fetchTaxes();
  }, []);
  const handleEdit = (tx) => {
    setEditingId(tx._id);
    setValue("name", tx.name);
    setValue("cgst", tx.cgst);
    setValue("sgst", tx.sgst);
    setValue("igst", tx.igst);
    setOpen(true);
  };
  const handleAdd = () => {
    setEditingId(null);
    reset({
      name: "",
      cgst: 0,
      sgst: 0,
      igst: 0
    });
    setOpen(true);
  };
  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    const url = editingId ? `/api/masters/tax-codes/${editingId}` : "/api/masters/tax-codes";
    const method = editingId ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      toast.success("Saved!");
      setOpen(false);
      fetchTaxes();
    }
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "flex justify-between items-center",
      children: [/* @__PURE__ */ jsx("h2", {
        className: "text-2xl font-bold",
        children: "Tax Codes"
      }), /* @__PURE__ */ jsxs(Button, {
        onClick: handleAdd,
        className: "hover-card-glow bg-orange-600",
        children: [/* @__PURE__ */ jsx(Plus, {
          className: "mr-2 h-4 w-4"
        }), " Add Tax"]
      })]
    }), /* @__PURE__ */ jsx(Dialog, {
      open,
      onOpenChange: setOpen,
      children: /* @__PURE__ */ jsxs(DialogContent, {
        className: "sm:max-w-[400px]",
        children: [/* @__PURE__ */ jsx(DialogHeader, {
          children: /* @__PURE__ */ jsxs(DialogTitle, {
            children: [editingId ? "Edit" : "New", " Tax Code"]
          })
        }), /* @__PURE__ */ jsxs("form", {
          onSubmit: handleSubmit(onSubmit),
          className: "space-y-4",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "space-y-2",
            children: [/* @__PURE__ */ jsx(Label, {
              children: "Tax Name"
            }), /* @__PURE__ */ jsx(Input, {
              ...register2("name"),
              placeholder: "e.g. GST 18%"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "grid grid-cols-3 gap-2",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [/* @__PURE__ */ jsx(Label, {
                children: "CGST %"
              }), /* @__PURE__ */ jsx(Input, {
                type: "number",
                step: "0.1",
                ...register2("cgst")
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [/* @__PURE__ */ jsx(Label, {
                children: "SGST %"
              }), /* @__PURE__ */ jsx(Input, {
                type: "number",
                step: "0.1",
                ...register2("sgst")
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [/* @__PURE__ */ jsx(Label, {
                children: "IGST %"
              }), /* @__PURE__ */ jsx(Input, {
                type: "number",
                step: "0.1",
                ...register2("igst")
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "p-2 bg-slate-100 rounded text-center text-sm font-bold",
            children: ["Total Rate: ", totalRate.toFixed(2), "%"]
          }), /* @__PURE__ */ jsx(DialogFooter, {
            children: /* @__PURE__ */ jsx(Button, {
              type: "submit",
              className: "hover-card-glow bg-orange-600 w-full",
              children: editingId ? "Update" : "Save"
            })
          })]
        })]
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "grid gap-10 md:grid-cols-3 lg:grid-cols-4",
      children: taxes.map((tx) => /* @__PURE__ */ jsx(Card, {
        className: "relative hover-card-glow hover:shadow-sm transition-all",
        children: /* @__PURE__ */ jsxs(CardContent, {
          className: "p-5 flex items-center gap-4",
          children: [/* @__PURE__ */ jsx("div", {
            className: "h-10 w-10 bg-blue-100 flex items-center justify-center rounded text-blue-700 font-bold",
            children: /* @__PURE__ */ jsx(Percent, {
              size: 18
            })
          }), /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("h4", {
              className: "font-bold",
              children: tx.name
            }), /* @__PURE__ */ jsxs("p", {
              className: "text-xs text-slate-500",
              children: ["Total: ", tx.totalRate, "%"]
            })]
          }), /* @__PURE__ */ jsx(Button, {
            variant: "ghost",
            size: "icon",
            className: "absolute top-2 right-2",
            onClick: () => handleEdit(tx),
            children: /* @__PURE__ */ jsx(Pencil, {
              className: "h-4 w-4 text-slate-400"
            })
          })]
        })
      }, tx._id))
    })]
  });
});
const route18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: taxCodes,
  meta: meta$a
}, Symbol.toStringTag, { value: "Module" }));
function meta$9({}) {
  return [{
    title: "Sales Orders - ScaffRent"
  }];
}
const salesSchema = z.object({
  date: z.string(),
  referenceNo: z.string().optional(),
  customer: z.string().min(1, "Select Customer"),
  site: z.string().min(1, "Select Site / Project"),
  duration: z.coerce.number().optional(),
  currencyRate: z.coerce.number().min(1),
  taxCode: z.string().optional(),
  transportCharges: z.coerce.number().min(0),
  loadingCharges: z.coerce.number().min(0)
});
function SalesForm({
  type
}) {
  const isRental = type === "RENTAL";
  const [rows, setRows] = useState([]);
  const [terms, setTerms] = useState([""]);
  const [customers2, setCustomers] = useState([]);
  const [sites2, setSites] = useState([]);
  const [items2, setItems] = useState([]);
  const [taxCodes2, setTaxCodes] = useState([]);
  const [filteredSites, setFilteredSites] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedSite, setSelectedSite] = useState(null);
  const [history, setHistory] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const {
    register: register2,
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: {
      errors
    }
  } = useForm({
    resolver: zodResolver(salesSchema),
    defaultValues: {
      date: format(/* @__PURE__ */ new Date(), "yyyy-MM-dd"),
      referenceNo: "",
      customer: "",
      site: "",
      currencyRate: 1,
      duration: 0,
      taxCode: "",
      transportCharges: 0,
      loadingCharges: 0
    }
  });
  const watchCustId = watch("customer");
  const watchSiteId = watch("site");
  const watchCharges = watch(["transportCharges", "loadingCharges", "taxCode"]);
  useEffect(() => {
    const fetchAll = async () => {
      const token = localStorage.getItem("token");
      const h = {
        "Authorization": `Bearer ${token}`
      };
      try {
        const [c, s, i, t] = await Promise.all([fetch("/api/masters/customers", {
          headers: h
        }).then((r) => r.json()), fetch("/api/sites", {
          headers: h
        }).then((r) => r.json()), fetch("/api/masters/items", {
          headers: h
        }).then((r) => r.json()), fetch("/api/masters/tax-codes", {
          headers: h
        }).then((r) => r.json())]);
        setCustomers(Array.isArray(c) ? c : []);
        setSites(Array.isArray(s) ? s : []);
        setItems(Array.isArray(i) ? i : []);
        setTaxCodes(Array.isArray(t) ? t : []);
      } catch (e) {
        console.error("Master fetch error", e);
      }
    };
    fetchAll();
  }, []);
  const fetchHistory = useCallback(async (pageNum) => {
    setIsLoadingHistory(true);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`/api/sales?type=${type}&page=${pageNum}&limit=7`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setHistory(data.orders);
        setTotalPages(data.pagination.totalPages);
        setPage(data.pagination.currentPage);
      }
    } catch (e) {
      console.error("History error", e);
    }
    setIsLoadingHistory(false);
  }, [type]);
  useEffect(() => {
    fetchHistory(1);
  }, [fetchHistory]);
  useEffect(() => {
    if (watchCustId) {
      const cust = customers2.find((c) => c._id === watchCustId);
      setSelectedCustomer(cust);
      const relSites = sites2.filter((s) => s.customer?._id === watchCustId);
      setFilteredSites(relSites);
    } else {
      setSelectedCustomer(null);
      setFilteredSites([]);
    }
  }, [watchCustId, customers2, sites2]);
  useEffect(() => {
    if (watchSiteId) {
      const site = sites2.find((s) => s._id === watchSiteId);
      setSelectedSite(site);
    } else {
      setSelectedSite(null);
    }
  }, [watchSiteId, sites2]);
  const addRow = () => setRows([...rows, {
    itemId: "",
    itemName: "",
    unit: "",
    quantity: 1,
    rate: 0,
    amount: 0,
    remark: ""
  }]);
  const removeRow = (i) => {
    const n = [...rows];
    n.splice(i, 1);
    setRows(n);
  };
  const handleItemChange = (index, itemId) => {
    const item = items2.find((i) => i._id === itemId);
    const updated = [...rows];
    updated[index].itemId = itemId;
    if (item) {
      updated[index].itemName = item.name;
      updated[index].unit = item.unit;
      updated[index].rate = isRental ? item.monthlyRentRate || 0 : item.sellRate || 0;
      updated[index].amount = updated[index].quantity * updated[index].rate;
    }
    setRows(updated);
  };
  const handleCalc = (index, field, val) => {
    const n = [...rows];
    n[index][field] = field === "remark" ? val : parseFloat(val) || 0;
    if (field !== "remark") n[index].amount = n[index].quantity * n[index].rate;
    setRows(n);
  };
  const subTotal = rows.reduce((acc, r) => acc + r.amount, 0);
  const transport = Number(watchCharges[0] || 0);
  const loading = Number(watchCharges[1] || 0);
  const taxableAmount = subTotal + transport + loading;
  const selectedTaxId = String(watchCharges[2] || "");
  const selectedTax = taxCodes2.find((t) => t._id === selectedTaxId);
  const taxRate = selectedTax ? selectedTax.totalRate : 0;
  const taxAmount = taxableAmount * (taxRate / 100);
  const grandTotal = taxableAmount + taxAmount;
  const addTerm = () => setTerms([...terms, ""]);
  const updateTerm = (i, val) => {
    const n = [...terms];
    n[i] = val;
    setTerms(n);
  };
  const removeTerm = (i) => {
    const n = [...terms];
    n.splice(i, 1);
    setTerms(n);
  };
  const onSubmit = async (data) => {
    if (rows.length === 0) return toast.error("Add at least one item");
    if (!data.site) return toast.error("Select Site / Project");
    const payload = {
      orderType: type,
      ...data,
      items: rows.map((r) => ({
        item: r.itemId,
        itemName: r.itemName,
        unit: r.unit,
        quantity: r.quantity,
        rate: r.rate,
        amount: r.amount,
        remark: r.remark
      })),
      subTotal,
      taxAmount,
      grandTotal,
      terms: terms.filter((t) => t.trim() !== ""),
      billingAddress: selectedCustomer?.billingAddress,
      siteAddress: selectedSite?.address
    };
    const token = localStorage.getItem("token");
    const res = await fetch("/api/sales", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      toast.success(`Sales Order Created!`);
      reset();
      setRows([]);
      setTerms([""]);
      setSelectedSite(null);
      fetchHistory(1);
    } else {
      toast.error("Failed to create order");
    }
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-8",
    children: [/* @__PURE__ */ jsxs("form", {
      onSubmit: handleSubmit(onSubmit),
      className: "space-y-6 pt-4 animate-in fade-in duration-300",
      children: [/* @__PURE__ */ jsxs(Card, {
        className: "hover-card-glow border-t-4 border-t-primary",
        children: [/* @__PURE__ */ jsx(CardHeader, {
          children: /* @__PURE__ */ jsx(CardTitle, {
            className: "text-base",
            children: "Order Header"
          })
        }), /* @__PURE__ */ jsxs(CardContent, {
          className: "grid grid-cols-1 md:grid-cols-4 gap-4",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "space-y-2",
            children: [/* @__PURE__ */ jsx(Label, {
              children: "Order Date"
            }), /* @__PURE__ */ jsx(Input, {
              type: "date",
              ...register2("date")
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-2",
            children: [/* @__PURE__ */ jsx(Label, {
              children: "Customer"
            }), /* @__PURE__ */ jsx(Controller, {
              name: "customer",
              control,
              render: ({
                field
              }) => /* @__PURE__ */ jsxs(Select, {
                onValueChange: field.onChange,
                value: field.value,
                children: [/* @__PURE__ */ jsx(SelectTrigger, {
                  children: /* @__PURE__ */ jsx(SelectValue, {
                    placeholder: "Select Customer"
                  })
                }), /* @__PURE__ */ jsx(SelectContent, {
                  children: customers2.map((c) => /* @__PURE__ */ jsx(SelectItem, {
                    value: c._id,
                    children: c.name
                  }, c._id))
                })]
              }, `cust-${customers2.length}`)
            }), errors.customer && /* @__PURE__ */ jsx("span", {
              className: "text-red-500 text-xs",
              children: errors.customer.message
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-2",
            children: [/* @__PURE__ */ jsx(Label, {
              children: "Site / Project"
            }), /* @__PURE__ */ jsx(Controller, {
              name: "site",
              control,
              render: ({
                field
              }) => /* @__PURE__ */ jsxs(Select, {
                onValueChange: field.onChange,
                value: field.value,
                disabled: !watchCustId,
                children: [/* @__PURE__ */ jsx(SelectTrigger, {
                  children: /* @__PURE__ */ jsx(SelectValue, {
                    placeholder: "Select Site"
                  })
                }), /* @__PURE__ */ jsx(SelectContent, {
                  children: filteredSites.map((s) => /* @__PURE__ */ jsx(SelectItem, {
                    value: s._id,
                    children: s.name
                  }, s._id))
                })]
              }, `site-${filteredSites.length}`)
            }), errors.site && /* @__PURE__ */ jsx("span", {
              className: "text-red-500 text-xs",
              children: errors.site.message
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-2",
            children: [/* @__PURE__ */ jsx(Label, {
              children: "Manual Order No"
            }), /* @__PURE__ */ jsx(Input, {
              ...register2("referenceNo"),
              placeholder: "e.g. PO-123"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-2",
            children: [/* @__PURE__ */ jsx(Label, {
              children: "Currency"
            }), /* @__PURE__ */ jsx(Input, {
              value: selectedCustomer?.currency?.code || "INR",
              disabled: true,
              className: "bg-slate-50 dark:bg-slate-900"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-2",
            children: [/* @__PURE__ */ jsx(Label, {
              children: "Exchange Rate"
            }), /* @__PURE__ */ jsx(Input, {
              type: "number",
              ...register2("currencyRate")
            })]
          }), isRental && /* @__PURE__ */ jsxs("div", {
            className: "space-y-2",
            children: [/* @__PURE__ */ jsx(Label, {
              children: "Duration (Days)"
            }), /* @__PURE__ */ jsx(Input, {
              type: "number",
              ...register2("duration")
            })]
          })]
        }), (selectedCustomer || selectedSite) && /* @__PURE__ */ jsxs("div", {
          className: "px-6 pb-4 text-[11px] text-slate-500 grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4",
          children: [/* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("strong", {
              children: "Billing Address:"
            }), " ", selectedCustomer?.billingAddress || "-"]
          }), /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("strong", {
              children: "Site Address:"
            }), " ", selectedSite?.address || "-"]
          })]
        })]
      }), /* @__PURE__ */ jsxs(Card, {
        className: "hover-card-glow",
        children: [/* @__PURE__ */ jsxs(CardHeader, {
          className: "pb-2 flex flex-row items-center justify-between",
          children: [/* @__PURE__ */ jsx(CardTitle, {
            className: "text-base",
            children: "Line Items"
          }), /* @__PURE__ */ jsxs(Button, {
            type: "button",
            variant: "outline",
            size: "sm",
            onClick: addRow,
            className: "h-8 border-dashed border-primary text-primary hover:bg-primary/5",
            children: [/* @__PURE__ */ jsx(Plus, {
              className: "h-3 w-3 mr-1"
            }), " Add Row"]
          })]
        }), /* @__PURE__ */ jsx(CardContent, {
          className: "p-0 overflow-x-auto",
          children: /* @__PURE__ */ jsxs(Table, {
            className: "min-w-[950px]",
            children: [/* @__PURE__ */ jsx(TableHeader, {
              children: /* @__PURE__ */ jsxs(TableRow, {
                className: "bg-slate-50 dark:bg-slate-900/50",
                children: [/* @__PURE__ */ jsx(TableHead, {
                  className: "w-[50px] text-center",
                  children: "#"
                }), /* @__PURE__ */ jsx(TableHead, {
                  className: "w-[300px]",
                  children: "Item Description"
                }), /* @__PURE__ */ jsx(TableHead, {
                  children: "Unit"
                }), /* @__PURE__ */ jsx(TableHead, {
                  className: "w-[100px]",
                  children: "Quantity"
                }), /* @__PURE__ */ jsx(TableHead, {
                  className: "w-[120px]",
                  children: "Rate"
                }), /* @__PURE__ */ jsx(TableHead, {
                  className: "w-[120px] text-right",
                  children: "Total"
                }), /* @__PURE__ */ jsx(TableHead, {
                  children: "Remark"
                }), /* @__PURE__ */ jsx(TableHead, {
                  className: "w-[50px]"
                })]
              })
            }), /* @__PURE__ */ jsx(TableBody, {
              children: rows.length === 0 ? /* @__PURE__ */ jsx(TableRow, {
                children: /* @__PURE__ */ jsx(TableCell, {
                  colSpan: 8,
                  className: "text-center h-24 text-slate-400",
                  children: 'Click "Add Row" to start adding items.'
                })
              }) : rows.map((row, i) => /* @__PURE__ */ jsxs(TableRow, {
                children: [/* @__PURE__ */ jsx(TableCell, {
                  className: "text-center font-medium text-slate-500",
                  children: i + 1
                }), /* @__PURE__ */ jsx(TableCell, {
                  children: /* @__PURE__ */ jsxs(Select, {
                    onValueChange: (v) => handleItemChange(i, v),
                    value: row.itemId,
                    children: [/* @__PURE__ */ jsx(SelectTrigger, {
                      className: "h-9",
                      children: /* @__PURE__ */ jsx(SelectValue, {
                        placeholder: "Select Item"
                      })
                    }), /* @__PURE__ */ jsx(SelectContent, {
                      children: items2.map((x) => /* @__PURE__ */ jsx(SelectItem, {
                        value: x._id,
                        children: x.name
                      }, x._id))
                    })]
                  })
                }), /* @__PURE__ */ jsx(TableCell, {
                  className: "text-sm font-medium",
                  children: row.unit || "-"
                }), /* @__PURE__ */ jsx(TableCell, {
                  children: /* @__PURE__ */ jsx(Input, {
                    type: "number",
                    className: "h-9",
                    value: row.quantity,
                    onChange: (e) => handleCalc(i, "quantity", e.target.value)
                  })
                }), /* @__PURE__ */ jsx(TableCell, {
                  children: /* @__PURE__ */ jsx(Input, {
                    type: "number",
                    className: "h-9",
                    value: row.rate,
                    onChange: (e) => handleCalc(i, "rate", e.target.value)
                  })
                }), /* @__PURE__ */ jsxs(TableCell, {
                  className: "font-bold text-right text-primary",
                  children: ["₹", row.amount.toFixed(2)]
                }), /* @__PURE__ */ jsx(TableCell, {
                  children: /* @__PURE__ */ jsx(Input, {
                    className: "h-9 text-xs",
                    value: row.remark,
                    onChange: (e) => handleCalc(i, "remark", e.target.value),
                    placeholder: "Item notes..."
                  })
                }), /* @__PURE__ */ jsx(TableCell, {
                  children: /* @__PURE__ */ jsx(Trash2, {
                    className: "h-4 w-4 text-red-500 cursor-pointer hover:scale-110 transition-transform",
                    onClick: () => removeRow(i)
                  })
                })]
              }, i))
            })]
          })
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
        children: [/* @__PURE__ */ jsxs(Card, {
          className: "hover-card-glow",
          children: [/* @__PURE__ */ jsx(CardHeader, {
            children: /* @__PURE__ */ jsx(CardTitle, {
              className: "text-base",
              children: "Terms & Conditions"
            })
          }), /* @__PURE__ */ jsxs(CardContent, {
            className: "space-y-2",
            children: [terms.map((t, i) => /* @__PURE__ */ jsxs("div", {
              className: "flex gap-2",
              children: [/* @__PURE__ */ jsx(Input, {
                value: t,
                onChange: (e) => updateTerm(i, e.target.value),
                placeholder: `Standard term #${i + 1}`
              }), /* @__PURE__ */ jsx(Button, {
                type: "button",
                variant: "ghost",
                size: "icon",
                onClick: () => removeTerm(i),
                children: /* @__PURE__ */ jsx(Trash2, {
                  className: "h-4 w-4 text-red-500"
                })
              })]
            }, i)), /* @__PURE__ */ jsx(Button, {
              type: "button",
              variant: "outline",
              size: "sm",
              onClick: addTerm,
              className: "w-full border-dashed",
              children: "Add New Term"
            })]
          })]
        }), /* @__PURE__ */ jsxs(Card, {
          className: "bg-slate-50/50 dark:bg-slate-900/20 hover-card-glow border-primary/20",
          children: [/* @__PURE__ */ jsx(CardHeader, {
            children: /* @__PURE__ */ jsxs(CardTitle, {
              className: "text-base flex gap-2",
              children: [/* @__PURE__ */ jsx(Calculator, {
                className: "h-5 w-5 text-primary"
              }), " Totals & Tax"]
            })
          }), /* @__PURE__ */ jsxs(CardContent, {
            className: "space-y-3",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "flex justify-between text-sm",
              children: [/* @__PURE__ */ jsx("span", {
                children: "Base Amount"
              }), /* @__PURE__ */ jsxs("span", {
                className: "font-mono font-bold",
                children: ["₹", subTotal.toFixed(2)]
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex justify-between items-center text-sm",
              children: [/* @__PURE__ */ jsx("span", {
                children: "Transport Charges"
              }), /* @__PURE__ */ jsx(Input, {
                type: "number",
                className: "w-28 h-8 text-right font-mono",
                ...register2("transportCharges")
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex justify-between items-center text-sm",
              children: [/* @__PURE__ */ jsx("span", {
                children: "Loading Charges"
              }), /* @__PURE__ */ jsx(Input, {
                type: "number",
                className: "w-28 h-8 text-right font-mono",
                ...register2("loadingCharges")
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex justify-between items-center text-sm pt-2 border-t",
              children: [/* @__PURE__ */ jsx("span", {
                className: "font-semibold text-primary",
                children: "Taxation"
              }), /* @__PURE__ */ jsx(Controller, {
                name: "taxCode",
                control,
                render: ({
                  field
                }) => /* @__PURE__ */ jsxs(Select, {
                  onValueChange: field.onChange,
                  value: field.value,
                  children: [/* @__PURE__ */ jsx(SelectTrigger, {
                    className: "w-48 h-9",
                    children: /* @__PURE__ */ jsx(SelectValue, {
                      placeholder: "Apply Tax"
                    })
                  }), /* @__PURE__ */ jsx(SelectContent, {
                    children: taxCodes2.map((t) => /* @__PURE__ */ jsx(SelectItem, {
                      value: t._id,
                      children: t.name
                    }, t._id))
                  })]
                })
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex justify-between text-xs text-slate-500 italic",
              children: [/* @__PURE__ */ jsxs("span", {
                children: ["Calculated Tax (", selectedTax?.totalRate || 0, "%)"]
              }), /* @__PURE__ */ jsxs("span", {
                children: ["₹", taxAmount.toFixed(2)]
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex justify-between text-xl font-bold border-t pt-3 mt-2 text-primary",
              children: [/* @__PURE__ */ jsx("span", {
                children: "Net Total"
              }), /* @__PURE__ */ jsxs("span", {
                className: "underline decoration-double underline-offset-4",
                children: ["₹", grandTotal.toFixed(2)]
              })]
            })]
          })]
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "flex justify-end gap-4 pb-4",
        children: /* @__PURE__ */ jsxs(Button, {
          type: "submit",
          className: "w-48 bg-primary hover:bg-primary/90 text-white shadow-lg",
          children: [/* @__PURE__ */ jsx(Save, {
            className: "mr-2 h-4 w-4"
          }), " Save Order"]
        })
      })]
    }), /* @__PURE__ */ jsxs(Card, {
      className: "hover-card-glow shadow-md border-none overflow-hidden",
      children: [/* @__PURE__ */ jsx(CardHeader, {
        className: "bg-slate-50 dark:bg-slate-900 border-b",
        children: /* @__PURE__ */ jsxs("div", {
          className: "flex items-center justify-between",
          children: [/* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsxs(CardTitle, {
              className: "flex items-center gap-2 text-lg",
              children: [/* @__PURE__ */ jsx(Clock, {
                className: "h-5 w-5 text-primary"
              }), " Recent Transactions"]
            }), /* @__PURE__ */ jsxs(CardDescription, {
              children: ["View and track your latest ", type.toLowerCase(), " orders."]
            })]
          }), /* @__PURE__ */ jsxs(Badge, {
            variant: "secondary",
            className: "font-mono",
            children: [type, " Orders"]
          })]
        })
      }), /* @__PURE__ */ jsxs(CardContent, {
        className: "p-0",
        children: [/* @__PURE__ */ jsx("div", {
          className: "overflow-x-auto",
          children: /* @__PURE__ */ jsxs(Table, {
            children: [/* @__PURE__ */ jsx(TableHeader, {
              children: /* @__PURE__ */ jsxs(TableRow, {
                className: "bg-slate-100/50 dark:bg-slate-900/50",
                children: [/* @__PURE__ */ jsx(TableHead, {
                  children: "Doc Number"
                }), /* @__PURE__ */ jsx(TableHead, {
                  children: "Date"
                }), /* @__PURE__ */ jsx(TableHead, {
                  children: "Customer"
                }), /* @__PURE__ */ jsx(TableHead, {
                  className: "text-right",
                  children: "Grand Total"
                }), /* @__PURE__ */ jsx(TableHead, {
                  className: "text-center",
                  children: "Items"
                })]
              })
            }), /* @__PURE__ */ jsx(TableBody, {
              children: isLoadingHistory ? /* @__PURE__ */ jsx(TableRow, {
                children: /* @__PURE__ */ jsx(TableCell, {
                  colSpan: 5,
                  className: "text-center h-32",
                  children: "Loading historical data..."
                })
              }) : history.length === 0 ? /* @__PURE__ */ jsx(TableRow, {
                children: /* @__PURE__ */ jsx(TableCell, {
                  colSpan: 5,
                  className: "text-center h-32 text-slate-400",
                  children: "No records found for this category."
                })
              }) : history.map((order) => /* @__PURE__ */ jsxs(TableRow, {
                className: "group hover:bg-slate-50 dark:hover:bg-slate-900/50",
                children: [/* @__PURE__ */ jsx(TableCell, {
                  className: "font-mono font-bold text-primary",
                  children: order.docNo
                }), /* @__PURE__ */ jsx(TableCell, {
                  className: "text-slate-600",
                  children: format(new Date(order.date), "dd MMM yyyy")
                }), /* @__PURE__ */ jsx(TableCell, {
                  className: "font-medium",
                  children: order.customer?.name || "N/A"
                }), /* @__PURE__ */ jsxs(TableCell, {
                  className: "text-right font-bold text-slate-900 dark:text-slate-100",
                  children: ["₹", order.grandTotal?.toLocaleString()]
                }), /* @__PURE__ */ jsx(TableCell, {
                  className: "text-center",
                  children: /* @__PURE__ */ jsx(Badge, {
                    variant: "outline",
                    children: order.items?.length || 0
                  })
                })]
              }, order._id))
            })]
          })
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex items-center justify-between p-4 border-t bg-slate-50/50 dark:bg-slate-900/30",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "text-xs text-slate-500 font-medium italic",
            children: ["Showing page ", page, " of ", totalPages]
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex gap-2",
            children: [/* @__PURE__ */ jsxs(Button, {
              variant: "outline",
              size: "sm",
              onClick: () => fetchHistory(page - 1),
              disabled: page <= 1 || isLoadingHistory,
              className: "h-8 shadow-sm",
              children: [/* @__PURE__ */ jsx(ChevronLeft, {
                className: "h-4 w-4"
              }), " Previous"]
            }), /* @__PURE__ */ jsxs(Button, {
              variant: "outline",
              size: "sm",
              onClick: () => fetchHistory(page + 1),
              disabled: page >= totalPages || isLoadingHistory,
              className: "h-8 shadow-sm",
              children: ["Next ", /* @__PURE__ */ jsx(ChevronRight, {
                className: "h-4 w-4"
              })]
            })]
          })]
        })]
      })]
    })]
  });
}
const sales = UNSAFE_withComponentProps(function SalesPage() {
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "flex flex-col md:flex-row md:items-center justify-between gap-4",
      children: [/* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-3xl font-bold tracking-tight text-slate-900 dark:text-white",
          children: "Sales & Rental Orders"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-slate-500 text-sm",
          children: "Issue new orders and track historical transactions."
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "p-1 bg-slate-100 dark:bg-slate-900 rounded-lg border flex gap-1",
        children: /* @__PURE__ */ jsxs("div", {
          className: "flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-orange-600 bg-white dark:bg-slate-800 rounded shadow-sm border border-orange-100",
          children: [/* @__PURE__ */ jsx(ShoppingBag, {
            size: 14
          }), " Active Module"]
        })
      })]
    }), /* @__PURE__ */ jsxs(Tabs, {
      defaultValue: "rental",
      className: "w-full",
      children: [/* @__PURE__ */ jsxs(TabsList, {
        className: "grid w-full grid-cols-2 h-12 bg-slate-100 dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800 mb-6 max-w-md",
        children: [/* @__PURE__ */ jsx(TabsTrigger, {
          value: "rental",
          className: "data-[state=active]:bg-primary data-[state=active]:text-white transition-all",
          children: "Rental Sales"
        }), /* @__PURE__ */ jsx(TabsTrigger, {
          value: "sales",
          className: "data-[state=active]:bg-primary data-[state=active]:text-white transition-all",
          children: "Standard Sales"
        })]
      }), /* @__PURE__ */ jsx(TabsContent, {
        value: "rental",
        className: "outline-none",
        children: /* @__PURE__ */ jsx(SalesForm, {
          type: "RENTAL"
        })
      }), /* @__PURE__ */ jsx(TabsContent, {
        value: "sales",
        className: "outline-none",
        children: /* @__PURE__ */ jsx(SalesForm, {
          type: "SALE"
        })
      })]
    })]
  });
});
const route19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: sales,
  meta: meta$9
}, Symbol.toStringTag, { value: "Module" }));
function meta$8({}) {
  return [{
    title: "Users - ScaffRent"
  }];
}
const userSchema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email(),
  mobile: z.string().min(10, "Mobile required"),
  role: z.string(),
  password: z.string().optional()
  // Optional on edit
});
const users = UNSAFE_withComponentProps(function UsersPage() {
  const [users2, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const {
    register: register2,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: {
      errors
    }
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      role: "Operator",
      password: ""
    }
  });
  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("/api/admin/users", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (res.ok) setUsers(await res.json());
    } catch (e) {
      console.error("Fetch error", e);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  const handleEdit = (user) => {
    setEditingId(user._id);
    setValue("name", user.name || "");
    setValue("email", user.email);
    setValue("mobile", user.mobile);
    setValue("role", user.role);
    setValue("password", "");
    setOpen(true);
  };
  const handleAdd = () => {
    setEditingId(null);
    reset({
      name: "",
      email: "",
      mobile: "",
      role: "Operator",
      password: ""
    });
    setOpen(true);
  };
  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    const url = editingId ? `/api/admin/users/${editingId}` : "/api/admin/users";
    const method = editingId ? "PUT" : "POST";
    if (!editingId && !data.password) {
      toast.error("Password is required for new users");
      return;
    }
    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        toast.success("Saved!");
        setOpen(false);
        fetchUsers();
      } else {
        toast.error("Failed");
      }
    } catch (e) {
      toast.error("Server Error");
    }
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "flex justify-between items-center",
      children: [/* @__PURE__ */ jsx("h2", {
        className: "text-2xl font-bold",
        children: "User Management"
      }), /* @__PURE__ */ jsxs(Button, {
        onClick: handleAdd,
        className: "hover-card-glow bg-orange-600 hover:bg-orange-700",
        children: [/* @__PURE__ */ jsx(Plus, {
          className: "mr-2 h-4 w-4"
        }), " Add User"]
      })]
    }), /* @__PURE__ */ jsx(Dialog, {
      open,
      onOpenChange: setOpen,
      children: /* @__PURE__ */ jsxs(DialogContent, {
        className: "sm:max-w-[500px]",
        children: [/* @__PURE__ */ jsx(DialogHeader, {
          children: /* @__PURE__ */ jsx(DialogTitle, {
            children: editingId ? "Edit User" : "Add User"
          })
        }), /* @__PURE__ */ jsxs("form", {
          onSubmit: handleSubmit(onSubmit),
          className: "space-y-4 py-2",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "grid grid-cols-3 gap-4",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "col-span-2 space-y-2",
              children: [/* @__PURE__ */ jsx(Label, {
                children: "Full Name"
              }), /* @__PURE__ */ jsx(Input, {
                ...register2("name"),
                placeholder: "John Doe"
              }), errors.name && /* @__PURE__ */ jsx("span", {
                className: "text-red-500 text-xs",
                children: errors.name.message
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [/* @__PURE__ */ jsx(Label, {
                children: "Role"
              }), /* @__PURE__ */ jsx(Controller, {
                name: "role",
                control,
                render: ({
                  field
                }) => /* @__PURE__ */ jsxs(Select, {
                  onValueChange: field.onChange,
                  value: field.value,
                  children: [/* @__PURE__ */ jsx(SelectTrigger, {
                    children: /* @__PURE__ */ jsx(SelectValue, {})
                  }), /* @__PURE__ */ jsxs(SelectContent, {
                    children: [/* @__PURE__ */ jsx(SelectItem, {
                      value: "Admin",
                      children: "Admin"
                    }), /* @__PURE__ */ jsx(SelectItem, {
                      value: "Operator",
                      children: "Operator"
                    }), /* @__PURE__ */ jsx(SelectItem, {
                      value: "Viewer",
                      children: "Viewer"
                    })]
                  })]
                })
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-2",
            children: [/* @__PURE__ */ jsx(Label, {
              children: "Email"
            }), /* @__PURE__ */ jsx(Input, {
              ...register2("email"),
              placeholder: "user@company.com"
            }), errors.email && /* @__PURE__ */ jsx("span", {
              className: "text-red-500 text-xs",
              children: errors.email.message
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-2",
            children: [/* @__PURE__ */ jsx(Label, {
              children: "Mobile"
            }), /* @__PURE__ */ jsx(Input, {
              ...register2("mobile"),
              placeholder: "9876543210"
            }), errors.mobile && /* @__PURE__ */ jsx("span", {
              className: "text-red-500 text-xs",
              children: errors.mobile.message
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-2",
            children: [/* @__PURE__ */ jsxs(Label, {
              children: ["Password ", editingId && /* @__PURE__ */ jsx("span", {
                className: "text-xs text-slate-400 font-normal",
                children: "(Leave blank to keep current)"
              })]
            }), /* @__PURE__ */ jsx(Input, {
              type: "password",
              ...register2("password"),
              placeholder: "******"
            })]
          }), /* @__PURE__ */ jsx(DialogFooter, {
            children: /* @__PURE__ */ jsx(Button, {
              type: "submit",
              className: "hover-card-glow bg-orange-600 w-full",
              children: editingId ? "Update" : "Save"
            })
          })]
        })]
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "grid gap-4 md:grid-cols-4 lg:grid-cols-4",
      children: users2.map((u) => /* @__PURE__ */ jsx(Card, {
        className: "relative hover-card-glow hover:shadow-md transition-all border-l-4 border-l-transparent hover:border-l-orange-500",
        children: /* @__PURE__ */ jsxs(CardContent, {
          className: "p-5",
          children: [/* @__PURE__ */ jsx(Button, {
            variant: "ghost",
            size: "icon",
            className: "absolute top-2 right-2 text-slate-400 hover:text-orange-600",
            onClick: () => handleEdit(u),
            children: /* @__PURE__ */ jsx(Pencil, {
              className: "h-4 w-4"
            })
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex items-center gap-3 mb-3",
            children: [/* @__PURE__ */ jsx("div", {
              className: "h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center font-bold text-orange-700",
              children: (u.name || "U").charAt(0).toUpperCase()
            }), /* @__PURE__ */ jsxs("div", {
              className: "overflow-hidden",
              children: [/* @__PURE__ */ jsx("h4", {
                className: "font-bold truncate text-slate-900",
                children: u.name || "Unknown User"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-xs text-slate-500 truncate",
                children: u.email
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex justify-between items-center text-sm border-t pt-3 mt-2",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "flex flex-col",
              children: [/* @__PURE__ */ jsx("span", {
                className: "text-[10px] uppercase text-slate-400 font-semibold",
                children: "User Code"
              }), /* @__PURE__ */ jsx("span", {
                className: "font-mono text-xs text-slate-600",
                children: u.userCode
              })]
            }), /* @__PURE__ */ jsx(Badge, {
              variant: "secondary",
              className: u.role === "Admin" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700",
              children: u.role || "User"
            })]
          })]
        })
      }, u._id))
    })]
  });
});
const route20 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: users,
  meta: meta$8
}, Symbol.toStringTag, { value: "Module" }));
function meta$7({}) {
  return [{
    title: "My Profile - ScaffRent"
  }];
}
const profile = UNSAFE_withComponentProps(function Profile() {
  const {
    register: register2,
    handleSubmit,
    setValue
  } = useForm();
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/admin/profile", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setValue("name", data.name);
        setValue("mobile", data.mobile);
        setValue("email", data.email);
      }
    };
    fetchProfile();
  }, [setValue]);
  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    const res = await fetch("/api/admin/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if (res.ok) toast.success("Profile Updated!");
    else toast.error("Update failed");
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "max-w-2xl mx-auto space-y-6",
    children: [/* @__PURE__ */ jsx("h2", {
      className: "text-2xl font-bold",
      children: "My Profile"
    }), /* @__PURE__ */ jsx(Card, {
      className: "hover-card-glow",
      children: /* @__PURE__ */ jsx(CardContent, {
        className: "p-6",
        children: /* @__PURE__ */ jsxs(Tabs, {
          defaultValue: "details",
          children: [/* @__PURE__ */ jsxs(TabsList, {
            className: "grid w-full grid-cols-2 mb-6",
            children: [/* @__PURE__ */ jsx(TabsTrigger, {
              value: "details",
              children: "Personal Details"
            }), /* @__PURE__ */ jsx(TabsTrigger, {
              value: "security",
              children: "Security"
            })]
          }), /* @__PURE__ */ jsxs("form", {
            onSubmit: handleSubmit(onSubmit),
            children: [/* @__PURE__ */ jsxs(TabsContent, {
              value: "details",
              className: "space-y-4",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "space-y-2",
                children: [/* @__PURE__ */ jsx(Label, {
                  children: "Full Name"
                }), /* @__PURE__ */ jsx(Input, {
                  ...register2("name")
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "space-y-2",
                children: [/* @__PURE__ */ jsx(Label, {
                  children: "Mobile"
                }), /* @__PURE__ */ jsx(Input, {
                  ...register2("mobile")
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "space-y-2",
                children: [/* @__PURE__ */ jsx(Label, {
                  children: "Email"
                }), /* @__PURE__ */ jsx(Input, {
                  ...register2("email"),
                  disabled: true,
                  className: "bg-slate-50"
                })]
              })]
            }), /* @__PURE__ */ jsx(TabsContent, {
              value: "security",
              className: "space-y-4",
              children: /* @__PURE__ */ jsxs("div", {
                className: "space-y-2",
                children: [/* @__PURE__ */ jsx(Label, {
                  children: "New Password"
                }), /* @__PURE__ */ jsx(Input, {
                  type: "password",
                  ...register2("password"),
                  placeholder: "Enter new password to change"
                })]
              })
            }), /* @__PURE__ */ jsx("div", {
              className: "pt-4 flex justify-end",
              children: /* @__PURE__ */ jsxs(Button, {
                type: "submit",
                className: "hover-card-glow bg-orange-600",
                children: [/* @__PURE__ */ jsx(Save, {
                  className: "mr-2 h-4 w-4"
                }), " Save Changes"]
              })
            })]
          })]
        })
      })
    })]
  });
});
const route21 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: profile,
  meta: meta$7
}, Symbol.toStringTag, { value: "Module" }));
function meta$6({}) {
  return [{
    title: "System Settings - ScaffRent"
  }];
}
const settings = UNSAFE_withComponentProps(function SettingsPage() {
  const {
    register: register2,
    handleSubmit,
    reset
  } = useForm();
  useEffect(() => {
    const fetchSettings = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/admin/settings", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (res.ok) reset(await res.json());
    };
    fetchSettings();
  }, [reset]);
  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    const res = await fetch("/api/admin/settings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if (res.ok) toast.success("Settings Saved!");
    else toast.error("Failed");
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "max-w-3xl mx-auto space-y-6",
    children: [/* @__PURE__ */ jsx("h2", {
      className: "text-2xl font-bold",
      children: "System Configuration"
    }), /* @__PURE__ */ jsxs("form", {
      onSubmit: handleSubmit(onSubmit),
      children: [/* @__PURE__ */ jsxs(Card, {
        className: "hover-card-glow",
        children: [/* @__PURE__ */ jsx(CardHeader, {
          children: /* @__PURE__ */ jsxs(CardTitle, {
            className: "text-base flex items-center gap-2",
            children: [/* @__PURE__ */ jsx(Settings, {
              className: "h-5 w-5"
            }), " General Config"]
          })
        }), /* @__PURE__ */ jsxs(CardContent, {
          className: "space-y-4",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "grid grid-cols-2 gap-4",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [/* @__PURE__ */ jsx(Label, {
                children: "Company Display Name"
              }), /* @__PURE__ */ jsx(Input, {
                ...register2("companyName")
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [/* @__PURE__ */ jsx(Label, {
                children: "Default Currency"
              }), /* @__PURE__ */ jsx(Input, {
                disabled: true,
                value: "INR (Auto)",
                className: "bg-slate-50"
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "grid grid-cols-2 gap-4",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [/* @__PURE__ */ jsx(Label, {
                children: "Invoice Prefix"
              }), /* @__PURE__ */ jsx(Input, {
                ...register2("invoicePrefix"),
                placeholder: "INV-"
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [/* @__PURE__ */ jsx(Label, {
                children: "Challan Prefix"
              }), /* @__PURE__ */ jsx(Input, {
                ...register2("challanPrefix"),
                placeholder: "CHL-"
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-2",
            children: [/* @__PURE__ */ jsx(Label, {
              children: "Default Terms & Conditions (Footer)"
            }), /* @__PURE__ */ jsx(Textarea, {
              ...register2("termsAndConditions"),
              placeholder: "Enter default terms...",
              className: "h-32"
            })]
          })]
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "pt-4 flex justify-end",
        children: /* @__PURE__ */ jsxs(Button, {
          type: "submit",
          className: "hover-card-glow bg-slate-900",
          children: [/* @__PURE__ */ jsx(Save, {
            className: "mr-2 h-4 w-4"
          }), " Save Configuration"]
        })
      })]
    })]
  });
});
const route22 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: settings,
  meta: meta$6
}, Symbol.toStringTag, { value: "Module" }));
function meta$5({}) {
  return [{
    title: "State Master - ScaffRent"
  }];
}
const stateSchema = z.object({
  name: z.string().min(2, "State Name required"),
  code: z.string().length(2, "GST Code must be 2 digits (e.g., 27)")
});
const states = UNSAFE_withComponentProps(function States() {
  const [states2, setStates] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const {
    register: register2,
    handleSubmit,
    reset,
    setValue,
    formState: {
      errors
    }
  } = useForm({
    resolver: zodResolver(stateSchema)
  });
  const fetchStates = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("/api/masters/states", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (res.ok) setStates(await res.json());
    } catch (e) {
      console.error("Fetch error");
    }
  };
  useEffect(() => {
    fetchStates();
  }, []);
  const handleSyncOnline = async () => {
    setIsSyncing(true);
    const token = localStorage.getItem("token");
    try {
      const externalData = [{
        code: "01",
        name: "Jammu and Kashmir"
      }, {
        code: "02",
        name: "Himachal Pradesh"
      }, {
        code: "03",
        name: "Punjab"
      }, {
        code: "04",
        name: "Chandigarh"
      }, {
        code: "05",
        name: "Uttarakhand"
      }, {
        code: "06",
        name: "Haryana"
      }, {
        code: "07",
        name: "Delhi"
      }, {
        code: "08",
        name: "Rajasthan"
      }, {
        code: "09",
        name: "Uttar Pradesh"
      }, {
        code: "10",
        name: "Bihar"
      }, {
        code: "11",
        name: "Sikkim"
      }, {
        code: "12",
        name: "Arunachal Pradesh"
      }, {
        code: "13",
        name: "Nagaland"
      }, {
        code: "14",
        name: "Manipur"
      }, {
        code: "15",
        name: "Mizoram"
      }, {
        code: "16",
        name: "Tripura"
      }, {
        code: "17",
        name: "Meghalaya"
      }, {
        code: "18",
        name: "Assam"
      }, {
        code: "19",
        name: "West Bengal"
      }, {
        code: "20",
        name: "Jharkhand"
      }, {
        code: "21",
        name: "Odisha"
      }, {
        code: "22",
        name: "Chhattisgarh"
      }, {
        code: "23",
        name: "Madhya Pradesh"
      }, {
        code: "24",
        name: "Gujarat"
      }, {
        code: "27",
        name: "Maharashtra"
      }, {
        code: "29",
        name: "Karnataka"
      }, {
        code: "30",
        name: "Goa"
      }, {
        code: "31",
        name: "Lakshadweep"
      }, {
        code: "32",
        name: "Kerala"
      }, {
        code: "33",
        name: "Tamil Nadu"
      }, {
        code: "34",
        name: "Puducherry"
      }, {
        code: "36",
        name: "Telangana"
      }, {
        code: "37",
        name: "Andhra Pradesh"
      }];
      const res = await fetch("/api/masters/states/sync", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(externalData)
      });
      if (res.ok) {
        toast.success("States Synced Successfully!");
        fetchStates();
      } else {
        toast.error("Sync Failed");
      }
    } catch (e) {
      toast.error("Error connecting to external API");
    }
    setIsSyncing(false);
  };
  const handleEdit = (st) => {
    setEditingId(st._id);
    setValue("name", st.name);
    setValue("code", st.code);
    setOpen(true);
  };
  const handleAdd = () => {
    setEditingId(null);
    reset({
      name: "",
      code: ""
    });
    setOpen(true);
  };
  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    const url = editingId ? `/api/masters/states/${editingId}` : "/api/masters/states";
    const method = editingId ? "PUT" : "POST";
    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        toast.success("Saved!");
        setOpen(false);
        fetchStates();
      } else {
        const err = await res.json();
        toast.error(err.message || "Failed");
      }
    } catch (e) {
      toast.error("Server Error");
    }
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4",
      children: [/* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-2xl font-bold",
          children: "State Master"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-muted-foreground",
          children: "Manage GST State Codes."
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "flex gap-2 w-full sm:w-auto",
        children: [/* @__PURE__ */ jsxs(Button, {
          variant: "outline",
          onClick: handleSyncOnline,
          disabled: isSyncing,
          className: "hover-card-glow flex-1 sm:flex-none",
          children: [isSyncing ? /* @__PURE__ */ jsx(Loader2, {
            className: "mr-2 h-4 w-4 animate-spin"
          }) : /* @__PURE__ */ jsx(CloudDownload, {
            className: "mr-2 h-4 w-4 text-blue-600"
          }), isSyncing ? "Syncing..." : "Sync Online"]
        }), /* @__PURE__ */ jsxs(Button, {
          onClick: handleAdd,
          className: "hover-card-glow bg-orange-600 flex-1 sm:flex-none",
          children: [/* @__PURE__ */ jsx(Plus, {
            className: "mr-2 h-4 w-4"
          }), " Add State"]
        })]
      })]
    }), /* @__PURE__ */ jsx(Dialog, {
      open,
      onOpenChange: setOpen,
      children: /* @__PURE__ */ jsxs(DialogContent, {
        className: "sm:max-w-[400px]",
        children: [/* @__PURE__ */ jsx(DialogHeader, {
          children: /* @__PURE__ */ jsxs(DialogTitle, {
            children: [editingId ? "Edit" : "Add", " State"]
          })
        }), /* @__PURE__ */ jsxs("form", {
          onSubmit: handleSubmit(onSubmit),
          className: "space-y-4",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "space-y-2",
            children: [/* @__PURE__ */ jsx(Label, {
              children: "State Name"
            }), /* @__PURE__ */ jsx(Input, {
              ...register2("name"),
              placeholder: "e.g. Maharashtra"
            }), errors.name && /* @__PURE__ */ jsx("span", {
              className: "text-red-500 text-xs",
              children: errors.name.message
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-2",
            children: [/* @__PURE__ */ jsx(Label, {
              children: "GST Code (2 Digits)"
            }), /* @__PURE__ */ jsx(Input, {
              ...register2("code"),
              maxLength: 2,
              placeholder: "e.g. 27"
            }), errors.code && /* @__PURE__ */ jsx("span", {
              className: "text-red-500 text-xs",
              children: errors.code.message
            })]
          }), /* @__PURE__ */ jsx(DialogFooter, {
            children: /* @__PURE__ */ jsx(Button, {
              type: "submit",
              className: "hover-card-glow bg-orange-600 w-full",
              children: editingId ? "Update" : "Save"
            })
          })]
        })]
      })
    }), /* @__PURE__ */ jsx(Card, {
      className: "relative hover-card-glow overflow-x-auto",
      children: /* @__PURE__ */ jsx(CardContent, {
        className: "p-0",
        children: /* @__PURE__ */ jsxs(Table, {
          children: [/* @__PURE__ */ jsx(TableHeader, {
            children: /* @__PURE__ */ jsxs(TableRow, {
              className: "bg-slate-50",
              children: [/* @__PURE__ */ jsx(TableHead, {
                className: "w-[100px]",
                children: "GST Code"
              }), /* @__PURE__ */ jsx(TableHead, {
                children: "State Name"
              }), /* @__PURE__ */ jsx(TableHead, {
                children: "Country"
              }), /* @__PURE__ */ jsx(TableHead, {
                className: "w-[50px]"
              })]
            })
          }), /* @__PURE__ */ jsx(TableBody, {
            children: states2.length === 0 ? /* @__PURE__ */ jsx(TableRow, {
              children: /* @__PURE__ */ jsxs(TableCell, {
                colSpan: 4,
                className: "text-center h-24 text-slate-400",
                children: ["No states found. Click ", /* @__PURE__ */ jsx("b", {
                  children: "Sync Online"
                }), " to fetch standard data."]
              })
            }) : states2.map((st) => /* @__PURE__ */ jsxs(TableRow, {
              children: [/* @__PURE__ */ jsx(TableCell, {
                className: "font-mono font-bold text-orange-700",
                children: st.code
              }), /* @__PURE__ */ jsx(TableCell, {
                className: "font-medium",
                children: st.name
              }), /* @__PURE__ */ jsx(TableCell, {
                className: "text-slate-500",
                children: "India"
              }), /* @__PURE__ */ jsx(TableCell, {
                children: /* @__PURE__ */ jsx(Button, {
                  variant: "ghost",
                  size: "icon",
                  onClick: () => handleEdit(st),
                  children: /* @__PURE__ */ jsx(Pencil, {
                    className: "h-4 w-4 text-slate-400"
                  })
                })
              })]
            }, st._id))
          })]
        })
      })
    })]
  });
});
const route23 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: states,
  meta: meta$5
}, Symbol.toStringTag, { value: "Module" }));
function meta$4({}) {
  return [{
    title: "Rental GRN - ScaffRent"
  }];
}
const grnSchema = z.object({
  date: z.string(),
  customer: z.string().min(1, "Select Customer"),
  site: z.string().min(1, "Select Site"),
  warehouse: z.string().min(1, "Select Warehouse"),
  vehicleNo: z.string().optional(),
  driverName: z.string().optional(),
  remark: z.string().optional()
});
const rentalGrn = UNSAFE_withComponentProps(function RentalGRN() {
  const [customers2, setCustomers] = useState([]);
  const [sites2, setSites] = useState([]);
  const [warehouses2, setWarehouses] = useState([]);
  const [grns, setGrns] = useState([]);
  const [filteredSites, setFilteredSites] = useState([]);
  const [siteItems, setSiteItems] = useState([]);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const {
    register: register2,
    control,
    handleSubmit,
    watch,
    reset,
    setValue
  } = useForm({
    resolver: zodResolver(grnSchema),
    defaultValues: {
      date: format(/* @__PURE__ */ new Date(), "yyyy-MM-dd"),
      customer: "",
      site: "",
      warehouse: "",
      vehicleNo: "",
      driverName: "",
      remark: ""
    }
  });
  const watchCustomer = watch("customer");
  const watchSite = watch("site");
  const fetchAll = async () => {
    const token = localStorage.getItem("token");
    const h = {
      "Authorization": `Bearer ${token}`
    };
    try {
      const [c, s, w, g] = await Promise.all([fetch("/api/masters/customers", {
        headers: h
      }).then((r) => r.json()), fetch("/api/masters/sites", {
        headers: h
      }).then((r) => r.json()), fetch("/api/masters/warehouses", {
        headers: h
      }).then((r) => r.json()), fetch("/api/store/rental-grn", {
        headers: h
      }).then((r) => r.json())]);
      setCustomers(c);
      setSites(s);
      setWarehouses(w);
      setGrns(g);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchAll();
  }, []);
  useEffect(() => {
    if (watchCustomer) {
      setFilteredSites(sites2.filter((s) => s.customer?._id === watchCustomer));
    } else {
      setFilteredSites([]);
    }
  }, [watchCustomer, sites2]);
  useEffect(() => {
    if (watchSite && !editingId) {
      const fetchInventory = async () => {
        const token = localStorage.getItem("token");
        const res = await fetch(`/api/store/site-inventory?siteId=${watchSite}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (res.ok) setSiteItems(await res.json());
      };
      fetchInventory();
    }
  }, [watchSite, editingId]);
  const handleEdit = (grn) => {
    setEditingId(grn._id);
    setValue("date", grn.date.split("T")[0]);
    setValue("customer", grn.customer?._id || "");
    setValue("site", grn.site?._id || "");
    setValue("warehouse", grn.warehouse || "");
    setValue("vehicleNo", grn.vehicleNo);
    setValue("driverName", grn.driverName);
    setValue("remark", grn.remark);
    const gridData = grn.items.map((i) => ({
      item: i.item,
      itemCode: i.itemCode,
      itemName: i.itemName,
      unit: i.unit,
      balanceQty: 0,
      // Placeholder as we are just viewing/editing record
      qtyOk: i.qtyOk,
      qtyExchange: i.qtyExchange,
      qtyExcess: i.qtyExcess,
      totalQty: i.totalQty,
      rate: i.rate,
      amount: i.amount
    }));
    setRows(gridData);
    setOpen(true);
  };
  const handleAdd = () => {
    setEditingId(null);
    setRows([]);
    reset({
      date: format(/* @__PURE__ */ new Date(), "yyyy-MM-dd"),
      customer: "",
      site: "",
      warehouse: "",
      vehicleNo: "",
      driverName: "",
      remark: ""
    });
    setOpen(true);
  };
  const addRow = () => {
    setRows([...rows, {
      item: "",
      itemCode: "",
      itemName: "",
      unit: "",
      balanceQty: 0,
      qtyOk: 0,
      qtyExchange: 0,
      qtyExcess: 0,
      rate: 0,
      amount: 0
    }]);
  };
  const removeRow = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };
  const handleItemSelect = (index, itemId) => {
    const item = siteItems.find((i) => i.item._id === itemId);
    if (!item) return;
    const newRows = [...rows];
    newRows[index] = {
      ...newRows[index],
      item: itemId,
      itemCode: item.itemCode,
      itemName: item.itemName,
      unit: item.unit,
      balanceQty: item.balanceQty,
      rate: item.rate
    };
    setRows(newRows);
  };
  const handleCalc = (index, field, val) => {
    const v = parseFloat(val) || 0;
    const newRows = [...rows];
    newRows[index][field] = v;
    const totalQty = (newRows[index].qtyOk || 0) + (newRows[index].qtyExchange || 0);
    newRows[index].totalQty = totalQty;
    newRows[index].amount = totalQty * newRows[index].rate;
    setRows(newRows);
  };
  const onSubmit = async (data) => {
    if (rows.length === 0) return toast.error("Add items");
    const payload = {
      ...data,
      items: rows
    };
    const token = localStorage.getItem("token");
    const url = editingId ? `/api/store/rental-grn/${editingId}` : "/api/store/rental-grn";
    const method = editingId ? "PUT" : "POST";
    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        toast.success(editingId ? "GRN Updated!" : "GRN Created!");
        setOpen(false);
        reset();
        setRows([]);
        fetchAll();
      } else {
        toast.error("Failed to save");
      }
    } catch (e) {
      toast.error("Server Error");
    }
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "flex justify-between items-center",
      children: [/* @__PURE__ */ jsx("h2", {
        className: "text-2xl font-bold",
        children: "Rental GRN (Returns)"
      }), /* @__PURE__ */ jsxs(Button, {
        onClick: handleAdd,
        className: "bg-orange-600 hover-card-glow",
        children: [/* @__PURE__ */ jsx(Plus, {
          className: "mr-2 h-4 w-4"
        }), " Create GRN"]
      })]
    }), /* @__PURE__ */ jsx(Dialog, {
      open,
      onOpenChange: setOpen,
      children: /* @__PURE__ */ jsxs(DialogContent, {
        className: "sm:max-w-[1100px] max-h-[95vh] overflow-y-auto",
        children: [/* @__PURE__ */ jsx(DialogHeader, {
          children: /* @__PURE__ */ jsx(DialogTitle, {
            children: editingId ? "Edit / View GRN" : "New Goods Received Note"
          })
        }), /* @__PURE__ */ jsxs("form", {
          onSubmit: handleSubmit(onSubmit),
          className: "space-y-6 py-2",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg border",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [/* @__PURE__ */ jsx(Label, {
                children: "Return Date"
              }), /* @__PURE__ */ jsx(Input, {
                type: "date",
                ...register2("date")
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [/* @__PURE__ */ jsx(Label, {
                children: "Customer"
              }), /* @__PURE__ */ jsx(Controller, {
                name: "customer",
                control,
                render: ({
                  field
                }) => /* @__PURE__ */ jsxs(Select, {
                  onValueChange: field.onChange,
                  value: field.value,
                  disabled: !!editingId,
                  children: [/* @__PURE__ */ jsx(SelectTrigger, {
                    children: /* @__PURE__ */ jsx(SelectValue, {
                      placeholder: "Select"
                    })
                  }), /* @__PURE__ */ jsx(SelectContent, {
                    children: customers2.map((c) => /* @__PURE__ */ jsx(SelectItem, {
                      value: c._id,
                      children: c.name
                    }, c._id))
                  })]
                })
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [/* @__PURE__ */ jsx(Label, {
                children: "Site (Source)"
              }), /* @__PURE__ */ jsx(Controller, {
                name: "site",
                control,
                render: ({
                  field
                }) => /* @__PURE__ */ jsxs(Select, {
                  onValueChange: field.onChange,
                  value: field.value,
                  disabled: !watchCustomer || !!editingId,
                  children: [/* @__PURE__ */ jsx(SelectTrigger, {
                    children: /* @__PURE__ */ jsx(SelectValue, {
                      placeholder: "Select"
                    })
                  }), /* @__PURE__ */ jsx(SelectContent, {
                    children: filteredSites.map((s) => /* @__PURE__ */ jsx(SelectItem, {
                      value: s._id,
                      children: s.name
                    }, s._id))
                  })]
                })
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [/* @__PURE__ */ jsx(Label, {
                children: "To Warehouse"
              }), /* @__PURE__ */ jsx(Controller, {
                name: "warehouse",
                control,
                render: ({
                  field
                }) => /* @__PURE__ */ jsxs(Select, {
                  onValueChange: field.onChange,
                  value: field.value,
                  children: [/* @__PURE__ */ jsx(SelectTrigger, {
                    children: /* @__PURE__ */ jsx(SelectValue, {
                      placeholder: "Select"
                    })
                  }), /* @__PURE__ */ jsx(SelectContent, {
                    children: warehouses2.map((w) => /* @__PURE__ */ jsx(SelectItem, {
                      value: w._id,
                      children: w.name
                    }, w._id))
                  })]
                })
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [/* @__PURE__ */ jsx(Label, {
                children: "Vehicle No"
              }), /* @__PURE__ */ jsx(Input, {
                ...register2("vehicleNo")
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [/* @__PURE__ */ jsx(Label, {
                children: "Driver Name"
              }), /* @__PURE__ */ jsx(Input, {
                ...register2("driverName")
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "border rounded-md overflow-x-auto",
            children: [/* @__PURE__ */ jsxs(Table, {
              className: "min-w-[1000px]",
              children: [/* @__PURE__ */ jsx(TableHeader, {
                children: /* @__PURE__ */ jsxs(TableRow, {
                  className: "bg-slate-100",
                  children: [/* @__PURE__ */ jsx(TableHead, {
                    className: "w-[180px]",
                    children: "Item"
                  }), /* @__PURE__ */ jsx(TableHead, {
                    children: "Unit"
                  }), /* @__PURE__ */ jsx(TableHead, {
                    className: "text-right text-slate-500",
                    children: "Site Bal."
                  }), /* @__PURE__ */ jsx(TableHead, {
                    className: "w-[100px] text-right font-bold text-green-600 bg-green-50",
                    children: "OK Qty"
                  }), /* @__PURE__ */ jsx(TableHead, {
                    className: "w-[100px] text-right font-bold text-red-600 bg-red-50",
                    children: "Exch/Dmg"
                  }), /* @__PURE__ */ jsx(TableHead, {
                    className: "w-[100px] text-right font-bold text-blue-600 bg-blue-50",
                    children: "Excess"
                  }), /* @__PURE__ */ jsx(TableHead, {
                    className: "text-right",
                    children: "Rate"
                  }), /* @__PURE__ */ jsx(TableHead, {
                    className: "text-right",
                    children: "Amount"
                  }), /* @__PURE__ */ jsx(TableHead, {
                    className: "w-[50px]"
                  })]
                })
              }), /* @__PURE__ */ jsx(TableBody, {
                children: rows.map((row, i) => /* @__PURE__ */ jsxs(TableRow, {
                  children: [/* @__PURE__ */ jsx(TableCell, {
                    children: editingId ? /* @__PURE__ */ jsx("span", {
                      className: "font-medium text-sm pl-2",
                      children: row.itemName
                    }) : /* @__PURE__ */ jsxs(Select, {
                      onValueChange: (v) => handleItemSelect(i, v),
                      value: row.item,
                      children: [/* @__PURE__ */ jsx(SelectTrigger, {
                        className: "h-8",
                        children: /* @__PURE__ */ jsx(SelectValue, {
                          placeholder: "Select Item"
                        })
                      }), /* @__PURE__ */ jsx(SelectContent, {
                        children: siteItems.map((si) => /* @__PURE__ */ jsx(SelectItem, {
                          value: si.item._id,
                          children: si.itemName
                        }, si.item._id))
                      })]
                    })
                  }), /* @__PURE__ */ jsx(TableCell, {
                    className: "text-xs",
                    children: row.unit
                  }), /* @__PURE__ */ jsx(TableCell, {
                    className: "text-right text-slate-500",
                    children: row.balanceQty
                  }), /* @__PURE__ */ jsx(TableCell, {
                    className: "bg-green-50/30",
                    children: /* @__PURE__ */ jsx(Input, {
                      type: "number",
                      className: "h-8 text-right",
                      value: row.qtyOk,
                      onChange: (e) => handleCalc(i, "qtyOk", e.target.value)
                    })
                  }), /* @__PURE__ */ jsx(TableCell, {
                    className: "bg-red-50/30",
                    children: /* @__PURE__ */ jsx(Input, {
                      type: "number",
                      className: "h-8 text-right",
                      value: row.qtyExchange,
                      onChange: (e) => handleCalc(i, "qtyExchange", e.target.value)
                    })
                  }), /* @__PURE__ */ jsx(TableCell, {
                    className: "bg-blue-50/30",
                    children: /* @__PURE__ */ jsx(Input, {
                      type: "number",
                      className: "h-8 text-right",
                      value: row.qtyExcess,
                      onChange: (e) => handleCalc(i, "qtyExcess", e.target.value)
                    })
                  }), /* @__PURE__ */ jsx(TableCell, {
                    className: "text-right",
                    children: row.rate
                  }), /* @__PURE__ */ jsxs(TableCell, {
                    className: "text-right font-medium",
                    children: ["₹", row.amount?.toFixed(2)]
                  }), /* @__PURE__ */ jsx(TableCell, {
                    children: /* @__PURE__ */ jsx(Trash2, {
                      className: "h-4 w-4 text-red-500 cursor-pointer",
                      onClick: () => removeRow(i)
                    })
                  })]
                }, i))
              })]
            }), !editingId && /* @__PURE__ */ jsx("div", {
              className: "p-2 border-t flex justify-center bg-slate-50",
              children: /* @__PURE__ */ jsxs(Button, {
                type: "button",
                variant: "outline",
                size: "sm",
                onClick: addRow,
                disabled: !watchSite,
                children: [/* @__PURE__ */ jsx(Plus, {
                  className: "mr-2 h-4 w-4"
                }), " Add Return Item"]
              })
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-2",
            children: [/* @__PURE__ */ jsx(Label, {
              children: "Remark"
            }), /* @__PURE__ */ jsx(Textarea, {
              ...register2("remark"),
              className: "h-16"
            })]
          }), /* @__PURE__ */ jsx(DialogFooter, {
            className: "flex justify-end gap-2",
            children: /* @__PURE__ */ jsx(Button, {
              type: "submit",
              className: "hover-card-glow bg-orange-600 px-6",
              children: editingId ? "Update GRN" : "Generate GRN"
            })
          })]
        })]
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4",
      children: grns.map((grn) => /* @__PURE__ */ jsx(Card, {
        className: "hover:shadow-md transition-all hover-card-glow relative",
        children: /* @__PURE__ */ jsxs(CardContent, {
          className: "p-5",
          children: [/* @__PURE__ */ jsx(Button, {
            variant: "ghost",
            size: "icon",
            className: "absolute top-2 right-2 text-slate-400 hover:text-orange-600",
            onClick: () => handleEdit(grn),
            children: /* @__PURE__ */ jsx(Pencil, {
              className: "h-4 w-4"
            })
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex justify-between items-start mb-3",
            children: [/* @__PURE__ */ jsx("span", {
              className: "font-bold text-lg text-slate-800",
              children: grn.docNo
            }), /* @__PURE__ */ jsx(Badge, {
              variant: "outline",
              className: "text-xs bg-green-50 text-green-700",
              children: new Date(grn.date).toLocaleDateString()
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "text-sm space-y-1 text-slate-600",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "flex items-center gap-2",
              children: [/* @__PURE__ */ jsx(User, {
                className: "h-3 w-3"
              }), " ", grn.customer?.name]
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex items-center gap-2",
              children: [/* @__PURE__ */ jsx(MapPin, {
                className: "h-3 w-3"
              }), " ", grn.site?.name]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "mt-4 pt-3 border-t flex justify-between text-xs font-medium text-slate-500",
            children: [/* @__PURE__ */ jsxs("span", {
              children: [grn.items.length, " Items Returned"]
            }), /* @__PURE__ */ jsx("span", {
              className: "text-orange-600 cursor-pointer hover:underline",
              onClick: () => handleEdit(grn),
              children: "View Details"
            })]
          })]
        })
      }, grn._id))
    })]
  });
});
const route24 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: rentalGrn,
  meta: meta$4
}, Symbol.toStringTag, { value: "Module" }));
function meta$3({}) {
  return [{
    title: "Missing Items - ScaffRent"
  }];
}
const missSchema = z.object({
  date: z.string(),
  customer: z.string().min(1, "Select Customer"),
  site: z.string().min(1, "Select Site"),
  referenceChallan: z.string().optional(),
  // ✅ Now a dropdown ID
  remark: z.string().optional()
});
const missingEntries = UNSAFE_withComponentProps(function MissingEntries() {
  const [customers2, setCustomers] = useState([]);
  const [sites2, setSites] = useState([]);
  const [missingEntries2, setMissingEntries] = useState([]);
  const [filteredSites, setFilteredSites] = useState([]);
  const [siteChallans, setSiteChallans] = useState([]);
  const [siteItems, setSiteItems] = useState([]);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const {
    register: register2,
    control,
    handleSubmit,
    watch,
    reset,
    setValue
  } = useForm({
    resolver: zodResolver(missSchema),
    defaultValues: {
      date: format(/* @__PURE__ */ new Date(), "yyyy-MM-dd"),
      customer: "",
      site: "",
      referenceChallan: "",
      remark: ""
    }
  });
  const watchCustomer = watch("customer");
  const watchSite = watch("site");
  const fetchAll = async () => {
    const token = localStorage.getItem("token");
    const h = {
      "Authorization": `Bearer ${token}`
    };
    const [c, s, m] = await Promise.all([fetch("/api/masters/customers", {
      headers: h
    }).then((r) => r.json()), fetch("/api/masters/sites", {
      headers: h
    }).then((r) => r.json()), fetch("/api/store/missing-entries", {
      headers: h
    }).then((r) => r.json())]);
    setCustomers(c);
    setSites(s);
    setMissingEntries(m);
  };
  useEffect(() => {
    fetchAll();
  }, []);
  useEffect(() => {
    if (watchCustomer) {
      setFilteredSites(sites2.filter((s) => s.customer?._id === watchCustomer));
    } else {
      setFilteredSites([]);
    }
  }, [watchCustomer, sites2]);
  useEffect(() => {
    if (watchSite) {
      const loadSiteData = async () => {
        const token = localStorage.getItem("token");
        const h = {
          "Authorization": `Bearer ${token}`
        };
        const resItems = await fetch(`api/store/site-inventory?siteId=${watchSite}`, {
          headers: h
        });
        if (resItems.ok) setSiteItems(await resItems.json());
        const resChallans = await fetch(`/api/store/challans-by-site?siteId=${watchSite}`, {
          headers: h
        });
        if (resChallans.ok) setSiteChallans(await resChallans.json());
      };
      loadSiteData();
    } else {
      setSiteItems([]);
      setSiteChallans([]);
    }
  }, [watchSite]);
  const handleEdit = (entry2) => {
    setEditingId(entry2._id);
    setValue("date", entry2.date.split("T")[0]);
    setValue("customer", entry2.customer?._id || "");
    setValue("site", entry2.site?._id || "");
    setValue("referenceChallan", entry2.referenceChallan?._id || "");
    setValue("remark", entry2.remark);
    const gridData = entry2.items.map((i) => ({
      item: i.item,
      itemCode: i.itemCode,
      itemName: i.itemName,
      unit: i.unit,
      balanceQty: 0,
      missingQty: i.missingQty,
      rate: i.rate,
      amount: i.amount
    }));
    setRows(gridData);
    setOpen(true);
  };
  const handleAdd = () => {
    setEditingId(null);
    setRows([]);
    reset({
      date: format(/* @__PURE__ */ new Date(), "yyyy-MM-dd"),
      customer: "",
      site: "",
      referenceChallan: "",
      remark: ""
    });
    setOpen(true);
  };
  const addRow = () => {
    setRows([...rows, {
      item: "",
      itemCode: "",
      itemName: "",
      unit: "",
      balanceQty: 0,
      missingQty: 0,
      rate: 0,
      amount: 0
    }]);
  };
  const removeRow = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };
  const handleItemSelect = (index, itemId) => {
    const item = siteItems.find((i) => i.item._id === itemId);
    if (!item) return;
    const newRows = [...rows];
    newRows[index] = {
      ...newRows[index],
      item: itemId,
      itemCode: item.itemCode,
      itemName: item.itemName,
      unit: item.unit,
      balanceQty: item.balanceQty,
      rate: item.rate
      // Replacement Value
    };
    setRows(newRows);
  };
  const handleCalc = (index, val) => {
    const v = parseFloat(val) || 0;
    const newRows = [...rows];
    newRows[index].missingQty = v;
    newRows[index].amount = v * newRows[index].rate;
    if (v > newRows[index].balanceQty && !editingId) {
      toast.warning("Qty exceeds current site balance");
    }
    setRows(newRows);
  };
  const onSubmit = async (data) => {
    if (rows.length === 0) return toast.error("Add items");
    const payload = {
      ...data,
      items: rows
    };
    const token = localStorage.getItem("token");
    const url = editingId ? `/api/store/missing-entries/${editingId}` : "/api/store/missing-entries";
    const method = editingId ? "PUT" : "POST";
    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        toast.success(editingId ? "Entry Updated!" : "Missing Items Reported!");
        setOpen(false);
        reset();
        setRows([]);
        fetchAll();
      } else {
        toast.error("Failed to save");
      }
    } catch (e) {
      toast.error("Server Error");
    }
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "flex justify-between items-center",
      children: [/* @__PURE__ */ jsx("h2", {
        className: "text-2xl font-bold",
        children: "Missing Material"
      }), /* @__PURE__ */ jsxs(Button, {
        onClick: handleAdd,
        className: "bg-red-600 hover:bg-red-700 hover-card-glow",
        children: [/* @__PURE__ */ jsx(Plus, {
          className: "mr-2 h-4 w-4"
        }), " Report Missing"]
      })]
    }), /* @__PURE__ */ jsx(Dialog, {
      open,
      onOpenChange: setOpen,
      children: /* @__PURE__ */ jsxs(DialogContent, {
        className: "sm:max-w-[1000px] max-h-[95vh] overflow-y-auto",
        children: [/* @__PURE__ */ jsx(DialogHeader, {
          children: /* @__PURE__ */ jsxs(DialogTitle, {
            className: "text-red-700 flex items-center gap-2",
            children: [/* @__PURE__ */ jsx(AlertTriangle, {
              className: "h-5 w-5"
            }), " ", editingId ? "Edit" : "Report", " Missing Items"]
          })
        }), /* @__PURE__ */ jsxs("form", {
          onSubmit: handleSubmit(onSubmit),
          className: "space-y-6 py-2",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-red-50/50 rounded-lg border border-red-100",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [/* @__PURE__ */ jsx(Label, {
                children: "Date"
              }), /* @__PURE__ */ jsx(Input, {
                type: "date",
                ...register2("date")
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [/* @__PURE__ */ jsx(Label, {
                children: "Customer"
              }), /* @__PURE__ */ jsx(Controller, {
                name: "customer",
                control,
                render: ({
                  field
                }) => /* @__PURE__ */ jsxs(Select, {
                  onValueChange: field.onChange,
                  value: field.value,
                  disabled: !!editingId,
                  children: [/* @__PURE__ */ jsx(SelectTrigger, {
                    children: /* @__PURE__ */ jsx(SelectValue, {
                      placeholder: "Select"
                    })
                  }), /* @__PURE__ */ jsx(SelectContent, {
                    children: customers2.map((c) => /* @__PURE__ */ jsx(SelectItem, {
                      value: c._id,
                      children: c.name
                    }, c._id))
                  })]
                })
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [/* @__PURE__ */ jsx(Label, {
                children: "Site (Source)"
              }), /* @__PURE__ */ jsx(Controller, {
                name: "site",
                control,
                render: ({
                  field
                }) => /* @__PURE__ */ jsxs(Select, {
                  onValueChange: field.onChange,
                  value: field.value,
                  disabled: !watchCustomer || !!editingId,
                  children: [/* @__PURE__ */ jsx(SelectTrigger, {
                    children: /* @__PURE__ */ jsx(SelectValue, {
                      placeholder: "Select"
                    })
                  }), /* @__PURE__ */ jsx(SelectContent, {
                    children: filteredSites.map((s) => /* @__PURE__ */ jsx(SelectItem, {
                      value: s._id,
                      children: s.name
                    }, s._id))
                  })]
                })
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [/* @__PURE__ */ jsx(Label, {
                children: "Against Delivery Challan"
              }), /* @__PURE__ */ jsx(Controller, {
                name: "referenceChallan",
                control,
                render: ({
                  field
                }) => /* @__PURE__ */ jsxs(Select, {
                  onValueChange: field.onChange,
                  value: field.value,
                  disabled: !watchSite,
                  children: [/* @__PURE__ */ jsx(SelectTrigger, {
                    children: /* @__PURE__ */ jsx(SelectValue, {
                      placeholder: "Select Challan"
                    })
                  }), /* @__PURE__ */ jsx(SelectContent, {
                    children: siteChallans.length === 0 ? /* @__PURE__ */ jsx(SelectItem, {
                      value: "none",
                      disabled: true,
                      children: "No Challans found"
                    }) : siteChallans.map((c) => /* @__PURE__ */ jsxs(SelectItem, {
                      value: c._id,
                      children: [c.docNo, " (", new Date(c.date).toLocaleDateString(), ")"]
                    }, c._id))
                  })]
                })
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "border rounded-md overflow-x-auto",
            children: [/* @__PURE__ */ jsxs(Table, {
              className: "min-w-[800px]",
              children: [/* @__PURE__ */ jsx(TableHeader, {
                children: /* @__PURE__ */ jsxs(TableRow, {
                  className: "bg-slate-100",
                  children: [/* @__PURE__ */ jsx(TableHead, {
                    className: "w-[250px]",
                    children: "Item (At Site)"
                  }), /* @__PURE__ */ jsx(TableHead, {
                    children: "Unit"
                  }), /* @__PURE__ */ jsx(TableHead, {
                    className: "text-right text-slate-500",
                    children: "Site Balance"
                  }), /* @__PURE__ */ jsx(TableHead, {
                    className: "w-[120px] text-right font-bold text-red-600",
                    children: "Missing Qty"
                  }), /* @__PURE__ */ jsx(TableHead, {
                    className: "text-right",
                    children: "Replacement Rate"
                  }), /* @__PURE__ */ jsx(TableHead, {
                    className: "text-right",
                    children: "Recovery Amt"
                  }), /* @__PURE__ */ jsx(TableHead, {
                    className: "w-[50px]"
                  })]
                })
              }), /* @__PURE__ */ jsx(TableBody, {
                children: rows.map((row, i) => /* @__PURE__ */ jsxs(TableRow, {
                  children: [/* @__PURE__ */ jsx(TableCell, {
                    children: editingId ? /* @__PURE__ */ jsx("span", {
                      className: "text-sm font-medium",
                      children: row.itemName
                    }) : /* @__PURE__ */ jsxs(Select, {
                      onValueChange: (v) => handleItemSelect(i, v),
                      value: row.item,
                      children: [/* @__PURE__ */ jsx(SelectTrigger, {
                        className: "h-8",
                        children: /* @__PURE__ */ jsx(SelectValue, {
                          placeholder: "Select Item"
                        })
                      }), /* @__PURE__ */ jsx(SelectContent, {
                        children: siteItems.map((si) => /* @__PURE__ */ jsx(SelectItem, {
                          value: si.item._id,
                          children: si.itemName
                        }, si.item._id))
                      })]
                    })
                  }), /* @__PURE__ */ jsx(TableCell, {
                    className: "text-xs",
                    children: row.unit
                  }), /* @__PURE__ */ jsx(TableCell, {
                    className: "text-right text-slate-500",
                    children: row.balanceQty
                  }), /* @__PURE__ */ jsx(TableCell, {
                    children: /* @__PURE__ */ jsx(Input, {
                      type: "number",
                      className: "h-8 text-right font-bold text-red-700 border-red-200 focus-visible:ring-red-500",
                      value: row.missingQty,
                      onChange: (e) => handleCalc(i, e.target.value)
                    })
                  }), /* @__PURE__ */ jsx(TableCell, {
                    className: "text-right",
                    children: row.rate
                  }), /* @__PURE__ */ jsxs(TableCell, {
                    className: "text-right font-medium",
                    children: ["₹", row.amount?.toFixed(2)]
                  }), /* @__PURE__ */ jsx(TableCell, {
                    children: /* @__PURE__ */ jsx(Trash2, {
                      className: "h-4 w-4 text-red-500 cursor-pointer",
                      onClick: () => removeRow(i)
                    })
                  })]
                }, i))
              })]
            }), !editingId && /* @__PURE__ */ jsx("div", {
              className: "p-2 border-t flex justify-center bg-slate-50",
              children: /* @__PURE__ */ jsxs(Button, {
                type: "button",
                variant: "outline",
                size: "sm",
                onClick: addRow,
                disabled: !watchSite,
                className: "text-slate-600",
                children: [/* @__PURE__ */ jsx(Plus, {
                  className: "mr-2 h-4 w-4"
                }), " Add Item"]
              })
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-2",
            children: [/* @__PURE__ */ jsx(Label, {
              children: "Remark"
            }), /* @__PURE__ */ jsx(Textarea, {
              ...register2("remark"),
              className: "h-16",
              placeholder: "Reason for loss..."
            })]
          }), /* @__PURE__ */ jsx(DialogFooter, {
            className: "flex justify-end gap-2",
            children: /* @__PURE__ */ jsx(Button, {
              type: "submit",
              className: "hover-card-glow bg-orange-600 px-6",
              children: editingId ? "Update Missing Entry" : "Generate Missing Entry"
            })
          })]
        })]
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "grid gap-5 md:grid-cols-4 lg:grid-cols-4",
      children: missingEntries2.map((m) => /* @__PURE__ */ jsx(Card, {
        className: "hover:shadow-md transition-all hover-card-glow relative border-l-4 border-l-transparent hover:border-l-red-500",
        children: /* @__PURE__ */ jsxs(CardContent, {
          className: "p-5",
          children: [/* @__PURE__ */ jsx(Button, {
            variant: "ghost",
            size: "icon",
            className: "absolute top-2 right-2 text-slate-400 hover:text-red-600",
            onClick: () => handleEdit(m),
            children: /* @__PURE__ */ jsx(Pencil, {
              className: "h-4 w-4"
            })
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex justify-between items-start mb-3",
            children: [/* @__PURE__ */ jsx("span", {
              className: "font-bold text-lg text-slate-800",
              children: m.docNo
            }), /* @__PURE__ */ jsx(Badge, {
              variant: "outline",
              className: "text-xs bg-red-50 text-red-700",
              children: new Date(m.date).toLocaleDateString()
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "text-sm space-y-1 text-slate-600",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "flex items-center gap-2",
              children: [/* @__PURE__ */ jsx(User, {
                className: "h-3 w-3"
              }), " ", m.customer?.name]
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex items-center gap-2",
              children: [/* @__PURE__ */ jsx(MapPin, {
                className: "h-3 w-3"
              }), " ", m.site?.name]
            }), m.referenceChallan && /* @__PURE__ */ jsxs("div", {
              className: "flex items-center gap-2 text-red-600 font-medium bg-red-50 w-fit px-2 py-0.5 rounded text-xs mt-2",
              children: [/* @__PURE__ */ jsx(Link, {
                className: "h-3 w-3"
              }), " Ref: ", m.referenceChallan.docNo]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "mt-4 pt-3 border-t flex justify-between text-xs font-medium text-slate-500",
            children: [/* @__PURE__ */ jsxs("span", {
              children: [m.items.length, " Items Lost"]
            }), /* @__PURE__ */ jsx("span", {
              className: "text-red-600 cursor-pointer hover:underline",
              onClick: () => handleEdit(m),
              children: "View Details"
            })]
          })]
        })
      }, m._id))
    })]
  });
});
const route25 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: missingEntries,
  meta: meta$3
}, Symbol.toStringTag, { value: "Module" }));
function meta$2({}) {
  return [{
    title: "Extra Item Adjustment - ScaffRent"
  }];
}
const adjSchema = z.object({
  date: z.string(),
  customer: z.string().min(1, "Select Customer"),
  site: z.string().min(1, "Select Site"),
  referenceChallan: z.string().min(1, "Select Delivery Challan"),
  remark: z.string().optional()
});
const adjustments = UNSAFE_withComponentProps(function Adjustments() {
  const [customers2, setCustomers] = useState([]);
  const [sites2, setSites] = useState([]);
  const [filteredSites, setFilteredSites] = useState([]);
  const [adjustments2, setAdjustments] = useState([]);
  const [excessPool, setExcessPool] = useState([]);
  const [siteChallans, setSiteChallans] = useState([]);
  const [challanItems, setChallanItems] = useState([]);
  const [selectedExcess, setSelectedExcess] = useState(null);
  const [selectedTarget, setSelectedTarget] = useState(null);
  const [adjustQty, setAdjustQty] = useState(0);
  const [stagedRows, setStagedRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const {
    register: register2,
    control,
    handleSubmit,
    watch,
    reset,
    setValue
  } = useForm({
    resolver: zodResolver(adjSchema),
    defaultValues: {
      date: format(/* @__PURE__ */ new Date(), "yyyy-MM-dd"),
      customer: "",
      site: "",
      referenceChallan: "",
      remark: ""
    }
  });
  const watchCustomer = watch("customer");
  const watchSite = watch("site");
  const watchChallan = watch("referenceChallan");
  const fetchAll = async () => {
    const token = localStorage.getItem("token");
    const h = {
      "Authorization": `Bearer ${token}`
    };
    try {
      const [c, s, a] = await Promise.all([fetch("/api/masters/customers", {
        headers: h
      }).then((r) => r.json()), fetch("/api/sites", {
        headers: h
      }).then((r) => r.json()), fetch("/api/store/adjustments", {
        headers: h
      }).then((r) => r.json())]);
      setCustomers(Array.isArray(c) ? c : []);
      setSites(Array.isArray(s) ? s : []);
      setAdjustments(Array.isArray(a) ? a : []);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchAll();
  }, []);
  useEffect(() => {
    if (watchCustomer) setFilteredSites(sites2.filter((s) => s.customer?._id === watchCustomer));
    else setFilteredSites([]);
  }, [watchCustomer, sites2]);
  useEffect(() => {
    if (watchSite && !editingId) {
      const token = localStorage.getItem("token");
      const h = {
        "Authorization": `Bearer ${token}`
      };
      fetch(`/api/store/excess-pool?siteId=${watchSite}`, {
        headers: h
      }).then((r) => r.json()).then((d) => setExcessPool(Array.isArray(d) ? d : []));
      fetch(`api/store/challans-by-site?siteId=${watchSite}`, {
        headers: h
      }).then((r) => r.json()).then((d) => setSiteChallans(Array.isArray(d) ? d : []));
    } else if (!editingId) {
      setExcessPool([]);
      setSiteChallans([]);
    }
  }, [watchSite, editingId]);
  useEffect(() => {
    if (watchChallan && !editingId) {
      const token = localStorage.getItem("token");
      fetch(`/api/store/challan-items?challanId=${watchChallan}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }).then((r) => r.json()).then((d) => setChallanItems(Array.isArray(d) ? d : []));
    } else {
      setChallanItems([]);
    }
  }, [watchChallan, editingId]);
  const handleStage = () => {
    if (!selectedExcess || !selectedTarget || adjustQty <= 0) return toast.error("Invalid Selection");
    if (adjustQty > selectedExcess.balance) return toast.error(`Max Excess available: ${selectedExcess.balance}`);
    setStagedRows([...stagedRows, {
      excessItem: selectedExcess.id,
      excessItemName: selectedExcess.name,
      excessItemCode: selectedExcess.code,
      challanItem: selectedTarget.id,
      challanItemName: selectedTarget.name,
      challanItemCode: selectedTarget.code,
      adjustedQty: adjustQty
    }]);
    setSelectedExcess(null);
    setSelectedTarget(null);
    setAdjustQty(0);
  };
  const removeRow = (index) => {
    const n = [...stagedRows];
    n.splice(index, 1);
    setStagedRows(n);
  };
  const handleEdit = (adj) => {
    setEditingId(adj._id);
    setValue("date", adj.date.split("T")[0]);
    setValue("customer", adj.customer?._id || "");
    setValue("site", adj.site?._id || "");
    setValue("referenceChallan", adj.referenceChallan?._id || "");
    setValue("remark", adj.remark);
    const rows = adj.adjustments?.map((a) => ({
      excessItem: a.excessItem,
      excessItemName: a.excessItemName,
      challanItem: a.challanItem,
      challanItemName: a.challanItemName,
      adjustedQty: a.adjustedQty
    })) || [];
    setStagedRows(rows);
    setOpen(true);
  };
  const handleAdd = () => {
    setEditingId(null);
    setStagedRows([]);
    reset({
      date: format(/* @__PURE__ */ new Date(), "yyyy-MM-dd"),
      customer: "",
      site: "",
      referenceChallan: "",
      remark: ""
    });
    setOpen(true);
  };
  const onSubmit = async (data) => {
    if (stagedRows.length === 0) return toast.error("No adjustments staged");
    const token = localStorage.getItem("token");
    const url = editingId ? `/api/store/adjustments/${editingId}` : "/api/store/adjustments";
    const method = editingId ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        ...data,
        adjustments: stagedRows
      })
    });
    if (res.ok) {
      toast.success(editingId ? "Updated!" : "Created!");
      setOpen(false);
      reset();
      setStagedRows([]);
      fetchAll();
    } else {
      toast.error("Failed");
    }
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "flex justify-between items-center",
      children: [/* @__PURE__ */ jsx("h2", {
        className: "text-2xl font-bold",
        children: "Extra Item Adjustment"
      }), /* @__PURE__ */ jsxs(Button, {
        onClick: handleAdd,
        className: "bg-orange-600 hover-card-glow",
        children: [/* @__PURE__ */ jsx(Plus, {
          className: "mr-2 h-4 w-4"
        }), " New Adjustment"]
      })]
    }), /* @__PURE__ */ jsx(Dialog, {
      open,
      onOpenChange: setOpen,
      children: /* @__PURE__ */ jsxs(DialogContent, {
        className: "sm:max-w-[900px] max-h-[95vh] overflow-y-auto",
        children: [/* @__PURE__ */ jsx(DialogHeader, {
          children: /* @__PURE__ */ jsx(DialogTitle, {
            children: editingId ? "Edit Adjustment" : "Adjust Excess"
          })
        }), /* @__PURE__ */ jsxs("form", {
          onSubmit: handleSubmit(onSubmit),
          className: "space-y-6",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-lg border",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [/* @__PURE__ */ jsx(Label, {
                children: "Date"
              }), /* @__PURE__ */ jsx(Input, {
                type: "date",
                ...register2("date")
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [/* @__PURE__ */ jsx(Label, {
                children: "Customer"
              }), /* @__PURE__ */ jsx(Controller, {
                name: "customer",
                control,
                render: ({
                  field
                }) => /* @__PURE__ */ jsxs(Select, {
                  onValueChange: field.onChange,
                  value: field.value,
                  disabled: !!editingId,
                  children: [/* @__PURE__ */ jsx(SelectTrigger, {
                    children: /* @__PURE__ */ jsx(SelectValue, {
                      placeholder: "Select"
                    })
                  }), /* @__PURE__ */ jsx(SelectContent, {
                    children: customers2.map((c) => /* @__PURE__ */ jsx(SelectItem, {
                      value: c._id,
                      children: c.name
                    }, c._id))
                  })]
                })
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [/* @__PURE__ */ jsx(Label, {
                children: "Site"
              }), /* @__PURE__ */ jsx(Controller, {
                name: "site",
                control,
                render: ({
                  field
                }) => /* @__PURE__ */ jsxs(Select, {
                  onValueChange: field.onChange,
                  value: field.value,
                  disabled: !watchCustomer || !!editingId,
                  children: [/* @__PURE__ */ jsx(SelectTrigger, {
                    children: /* @__PURE__ */ jsx(SelectValue, {
                      placeholder: "Select"
                    })
                  }), /* @__PURE__ */ jsx(SelectContent, {
                    children: filteredSites.map((s) => /* @__PURE__ */ jsx(SelectItem, {
                      value: s._id,
                      children: s.name
                    }, s._id))
                  })]
                })
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [/* @__PURE__ */ jsx(Label, {
                children: "Ref. Delivery Challan"
              }), /* @__PURE__ */ jsx(Controller, {
                name: "referenceChallan",
                control,
                render: ({
                  field
                }) => /* @__PURE__ */ jsxs(Select, {
                  onValueChange: field.onChange,
                  value: field.value,
                  disabled: !watchSite,
                  children: [/* @__PURE__ */ jsx(SelectTrigger, {
                    children: /* @__PURE__ */ jsx(SelectValue, {
                      placeholder: "Select DC"
                    })
                  }), /* @__PURE__ */ jsx(SelectContent, {
                    children: siteChallans.map((c) => /* @__PURE__ */ jsxs(SelectItem, {
                      value: c._id,
                      children: [c.docNo, " (", new Date(c.date).toLocaleDateString(), ")"]
                    }, c._id))
                  })]
                })
              })]
            })]
          }), watchChallan && !editingId && /* @__PURE__ */ jsxs("div", {
            className: "bg-slate-50/80 p-4 rounded-lg border border-slate-200",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-4",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "space-y-2",
                children: [/* @__PURE__ */ jsx(Label, {
                  className: "text-green-600 font-bold",
                  children: "Select Excess Item (Source)"
                }), /* @__PURE__ */ jsxs(Select, {
                  onValueChange: (val) => {
                    const item = excessPool.find((e) => e.id === val);
                    setSelectedExcess(item);
                  },
                  value: selectedExcess?.id || "",
                  children: [/* @__PURE__ */ jsx(SelectTrigger, {
                    className: "border-green-200 bg-white",
                    children: /* @__PURE__ */ jsx(SelectValue, {
                      placeholder: "Available Excess"
                    })
                  }), /* @__PURE__ */ jsx(SelectContent, {
                    children: excessPool.length === 0 ? /* @__PURE__ */ jsx(SelectItem, {
                      value: "none",
                      disabled: true,
                      children: "No Excess Items"
                    }) : excessPool.map((e) => /* @__PURE__ */ jsxs(SelectItem, {
                      value: e.id,
                      children: [e.name, " (Bal: ", e.balance, ")"]
                    }, e.id))
                  })]
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "space-y-2",
                children: [/* @__PURE__ */ jsx(Label, {
                  className: "text-slate-700 font-bold",
                  children: "Select Target Item (Target)"
                }), /* @__PURE__ */ jsxs(Select, {
                  onValueChange: (val) => {
                    const item = challanItems.find((i) => i.id === val);
                    setSelectedTarget(item);
                  },
                  value: selectedTarget?.id || "",
                  children: [/* @__PURE__ */ jsx(SelectTrigger, {
                    className: "border-slate-300 bg-white",
                    children: /* @__PURE__ */ jsx(SelectValue, {
                      placeholder: "Item in Challan"
                    })
                  }), /* @__PURE__ */ jsx(SelectContent, {
                    children: challanItems.length === 0 ? /* @__PURE__ */ jsx(SelectItem, {
                      value: "none",
                      disabled: true,
                      children: "No Items in DC"
                    }) : challanItems.map((i) => /* @__PURE__ */ jsxs(SelectItem, {
                      value: i.id,
                      children: [i.name, " (Sent: ", i.currentQty, ")"]
                    }, i.id))
                  })]
                })]
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex gap-2 items-end justify-end",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "w-32 space-y-1",
                children: [/* @__PURE__ */ jsx(Label, {
                  children: "Qty"
                }), /* @__PURE__ */ jsx(Input, {
                  type: "number",
                  value: adjustQty,
                  onChange: (e) => setAdjustQty(Number(e.target.value)),
                  className: "bg-white"
                })]
              }), /* @__PURE__ */ jsxs(Button, {
                type: "button",
                onClick: handleStage,
                className: "bg-slate-900",
                children: [/* @__PURE__ */ jsx(ArrowRightLeft, {
                  className: "mr-2 h-4 w-4"
                }), " Swap"]
              })]
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "border rounded-md",
            children: /* @__PURE__ */ jsxs(Table, {
              children: [/* @__PURE__ */ jsx(TableHeader, {
                children: /* @__PURE__ */ jsxs(TableRow, {
                  className: "bg-slate-100",
                  children: [/* @__PURE__ */ jsx(TableHead, {
                    className: "text-green-700",
                    children: "Excess (Source)"
                  }), /* @__PURE__ */ jsx(TableHead, {
                    className: "text-slate-700",
                    children: "Target Item"
                  }), /* @__PURE__ */ jsx(TableHead, {
                    className: "text-right",
                    children: "Qty"
                  }), !editingId && /* @__PURE__ */ jsx(TableHead, {
                    className: "w-[50px]"
                  })]
                })
              }), /* @__PURE__ */ jsx(TableBody, {
                children: stagedRows.length === 0 ? /* @__PURE__ */ jsx(TableRow, {
                  children: /* @__PURE__ */ jsx(TableCell, {
                    colSpan: 4,
                    className: "text-center h-20 text-slate-400",
                    children: "No adjustments."
                  })
                }) : stagedRows.map((row, i) => /* @__PURE__ */ jsxs(TableRow, {
                  children: [/* @__PURE__ */ jsx(TableCell, {
                    className: "font-medium text-green-700",
                    children: row.excessItemName
                  }), /* @__PURE__ */ jsx(TableCell, {
                    className: "font-medium text-slate-700",
                    children: row.challanItemName
                  }), /* @__PURE__ */ jsx(TableCell, {
                    className: "text-right font-bold",
                    children: row.adjustedQty
                  }), !editingId && /* @__PURE__ */ jsx(TableCell, {
                    children: /* @__PURE__ */ jsx(Button, {
                      type: "button",
                      variant: "ghost",
                      size: "icon",
                      onClick: () => removeRow(i),
                      children: /* @__PURE__ */ jsx(Trash2, {
                        className: "h-4 w-4 text-red-500"
                      })
                    })
                  })]
                }, i))
              })]
            })
          }), /* @__PURE__ */ jsx(DialogFooter, {
            className: "flex justify-end gap-2",
            children: /* @__PURE__ */ jsx(Button, {
              type: "submit",
              className: "hover-card-glow bg-orange-600 px-6",
              children: editingId ? "Update Adjustment" : "Save Adjustment"
            })
          })]
        })]
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "grid gap-5 md:grid-cols-4 lg:grid-cols-4",
      children: adjustments2.map((adj) => /* @__PURE__ */ jsx(Card, {
        className: "hover:shadow-md transition-all hover-card-glow relative border-t-4 border-t-transparent hover:border-t-orange-500",
        children: /* @__PURE__ */ jsxs(CardContent, {
          className: "p-5",
          children: [/* @__PURE__ */ jsx(Button, {
            variant: "ghost",
            size: "icon",
            className: "absolute top-2 right-2 text-slate-400 hover:text-orange-600",
            onClick: () => handleEdit(adj),
            children: /* @__PURE__ */ jsx(Pencil, {
              className: "h-4 w-4"
            })
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex justify-between items-start mb-3",
            children: [/* @__PURE__ */ jsx("span", {
              className: "font-bold text-lg text-slate-800",
              children: adj.docNo
            }), /* @__PURE__ */ jsx(Badge, {
              variant: "outline",
              className: "text-xs",
              children: new Date(adj.date).toLocaleDateString()
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "text-sm space-y-1 text-slate-600",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "flex items-center gap-2",
              children: [/* @__PURE__ */ jsx(User, {
                className: "h-3 w-3"
              }), " ", adj.customer?.name]
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex items-center gap-2",
              children: [/* @__PURE__ */ jsx(MapPin, {
                className: "h-3 w-3"
              }), " ", adj.site?.name]
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex items-center gap-2 text-blue-600 bg-blue-50 px-2 py-0.5 rounded w-fit mt-1",
              children: [/* @__PURE__ */ jsx(Truck, {
                className: "h-3 w-3"
              }), " Ref: ", adj.referenceChallan?.docNo || "Unknown"]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "mt-4 pt-3 border-t text-xs font-medium text-slate-500 flex items-center gap-2",
            children: [/* @__PURE__ */ jsx(Scale, {
              className: "h-4 w-4 text-orange-600"
            }), /* @__PURE__ */ jsxs("span", {
              children: [adj.adjustments?.length || 0, " Items Swapped"]
            })]
          })]
        })
      }, adj._id))
    })]
  });
});
const route26 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: adjustments,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
const authLayout = UNSAFE_withComponentProps(function AuthLayout() {
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "absolute top-0 left-0 w-full h-full overflow-hidden z-0",
      children: [/* @__PURE__ */ jsx("div", {
        className: "absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-orange-100 blur-3xl opacity-60"
      }), /* @__PURE__ */ jsx("div", {
        className: "absolute top-[60%] -right-[10%] w-[40%] h-[40%] rounded-full bg-slate-200 blur-3xl opacity-60"
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "relative z-10 w-full max-w-md p-4",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "text-center mb-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "inline-flex items-center gap-2 mb-4",
          children: [/* @__PURE__ */ jsx("div", {
            className: "h-10 w-10 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg",
            children: "S"
          }), /* @__PURE__ */ jsxs("span", {
            className: "font-bold text-3xl tracking-tight text-slate-900",
            children: ["SCAFF", /* @__PURE__ */ jsx("span", {
              className: "text-orange-600",
              children: "RENT"
            })]
          })]
        }), /* @__PURE__ */ jsx("p", {
          className: "text-slate-500",
          children: "Rental Management System"
        })]
      }), /* @__PURE__ */ jsx(Outlet, {})]
    })]
  });
});
const route27 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: authLayout
}, Symbol.toStringTag, { value: "Module" }));
function meta$1({}) {
  return [{
    title: "Login - ScaffRent"
  }];
}
const loginSchema = z.object({
  userCode: z.string().min(3, "User Code is required"),
  password: z.string().min(1, "Password is required")
});
const login = UNSAFE_withComponentProps(function Login() {
  const navigate = useNavigate();
  const {
    register: register2,
    handleSubmit,
    formState: {
      errors,
      isSubmitting
    }
  } = useForm({
    resolver: zodResolver(loginSchema)
  });
  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if (!response.ok) {
        toast.error(result.message || "Login Failed");
        return;
      }
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify({
        email: result.email,
        userCode: result.userCode
      }));
      toast.success("Login Successful");
      navigate("/");
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Connection failed. Is backend running?");
    }
  };
  return /* @__PURE__ */ jsxs(Card, {
    className: "shadow-xl border-slate-200",
    children: [/* @__PURE__ */ jsxs(CardHeader, {
      className: "space-y-1",
      children: [/* @__PURE__ */ jsx(CardTitle, {
        className: "text-2xl font-bold text-center",
        children: "Welcome back"
      }), /* @__PURE__ */ jsx(CardDescription, {
        className: "text-center",
        children: "Enter your User Code to access your account"
      })]
    }), /* @__PURE__ */ jsx(CardContent, {
      children: /* @__PURE__ */ jsxs("form", {
        onSubmit: handleSubmit(onSubmit),
        className: "space-y-4",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "space-y-2",
          children: [/* @__PURE__ */ jsx(Label, {
            htmlFor: "userCode",
            children: "User Code"
          }), /* @__PURE__ */ jsx(Input, {
            id: "userCode",
            placeholder: "e.g. USR-1001",
            ...register2("userCode"),
            className: errors.userCode ? "border-red-500" : ""
          }), errors.userCode && /* @__PURE__ */ jsx("span", {
            className: "text-xs text-red-500",
            children: errors.userCode.message
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "space-y-2",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "flex items-center justify-between",
            children: [/* @__PURE__ */ jsx(Label, {
              htmlFor: "password",
              children: "Password"
            }), /* @__PURE__ */ jsx(Link$1, {
              to: "#",
              className: "text-xs text-orange-600 hover:underline",
              children: "Forgot password?"
            })]
          }), /* @__PURE__ */ jsx(Input, {
            id: "password",
            type: "password",
            ...register2("password"),
            className: errors.password ? "border-red-500" : ""
          }), errors.password && /* @__PURE__ */ jsx("span", {
            className: "text-xs text-red-500",
            children: errors.password.message
          })]
        }), /* @__PURE__ */ jsx(Button, {
          type: "submit",
          className: "hover-card-glow w-full bg-slate-900 hover:bg-slate-800",
          disabled: isSubmitting,
          children: isSubmitting ? /* @__PURE__ */ jsx(Loader2, {
            className: "mr-2 h-4 w-4 animate-spin"
          }) : "Sign In"
        })]
      })
    }), /* @__PURE__ */ jsx(CardFooter, {
      className: "flex flex-col gap-4 text-center text-sm",
      children: /* @__PURE__ */ jsxs("div", {
        className: "text-slate-500",
        children: ["Don't have an account?", " ", /* @__PURE__ */ jsx(Link$1, {
          to: "/register",
          className: "font-semibold text-orange-600 hover:underline",
          children: "Register Company"
        })]
      })
    })]
  });
});
const route28 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: login,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
function meta({}) {
  return [{
    title: "Register - ScaffRent"
  }];
}
const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  mobile: z.string().min(10, "Mobile number must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});
const register = UNSAFE_withComponentProps(function Register() {
  const [generatedUserCode, setGeneratedUserCode] = useState(null);
  const {
    register: register2,
    handleSubmit,
    formState: {
      errors,
      isSubmitting
    }
  } = useForm({
    resolver: zodResolver(registerSchema)
  });
  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: data.email,
          mobile: data.mobile,
          password: data.password
        })
      });
      const result = await response.json();
      if (!response.ok) {
        toast.error(result.message || "Registration Failed");
        return;
      }
      setGeneratedUserCode(result.userCode);
      toast.success("Account Created Successfully!");
    } catch (error) {
      toast.error("Network Error");
    }
  };
  if (generatedUserCode) {
    return /* @__PURE__ */ jsxs(Card, {
      className: "shadow-xl border-green-200 bg-green-50/50",
      children: [/* @__PURE__ */ jsxs(CardHeader, {
        className: "text-center",
        children: [/* @__PURE__ */ jsx("div", {
          className: "mx-auto h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-2",
          children: /* @__PURE__ */ jsx(CheckCircle2, {
            className: "h-6 w-6 text-green-600"
          })
        }), /* @__PURE__ */ jsx(CardTitle, {
          className: "text-2xl text-green-900",
          children: "Registration Successful!"
        }), /* @__PURE__ */ jsx(CardDescription, {
          className: "text-green-700",
          children: "Your account has been created."
        })]
      }), /* @__PURE__ */ jsxs(CardContent, {
        className: "space-y-4",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "bg-white p-4 rounded-lg border border-green-200 text-center",
          children: [/* @__PURE__ */ jsx("p", {
            className: "text-sm text-slate-500 mb-1",
            children: "Your Login User Code"
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex items-center justify-center gap-2",
            children: [/* @__PURE__ */ jsx("span", {
              className: "text-3xl font-mono font-bold text-slate-900 tracking-wider",
              children: generatedUserCode
            }), /* @__PURE__ */ jsx(Button, {
              variant: "ghost",
              size: "icon",
              className: "h-8 w-8",
              onClick: () => {
                navigator.clipboard.writeText(generatedUserCode);
                toast.success("Copied to clipboard");
              },
              children: /* @__PURE__ */ jsx(Copy, {
                className: "h-4 w-4 text-slate-400"
              })
            })]
          }), /* @__PURE__ */ jsx("p", {
            className: "text-xs text-slate-400 mt-2",
            children: "Please save this code to log in."
          })]
        }), /* @__PURE__ */ jsx(Link$1, {
          to: "/login",
          className: "block",
          children: /* @__PURE__ */ jsx(Button, {
            className: "w-full bg-green-600 hover:bg-green-700",
            children: "Go to Login"
          })
        })]
      })]
    });
  }
  return /* @__PURE__ */ jsxs(Card, {
    className: "shadow-xl border-slate-200",
    children: [/* @__PURE__ */ jsxs(CardHeader, {
      className: "space-y-1",
      children: [/* @__PURE__ */ jsx(CardTitle, {
        className: "text-2xl font-bold text-center",
        children: "Create an Account"
      }), /* @__PURE__ */ jsx(CardDescription, {
        className: "text-center",
        children: "Register your company to start managing rentals"
      })]
    }), /* @__PURE__ */ jsx(CardContent, {
      children: /* @__PURE__ */ jsxs("form", {
        onSubmit: handleSubmit(onSubmit),
        className: "space-y-4",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "space-y-2",
          children: [/* @__PURE__ */ jsx(Label, {
            htmlFor: "email",
            children: "Email"
          }), /* @__PURE__ */ jsx(Input, {
            id: "email",
            type: "email",
            placeholder: "admin@company.com",
            ...register2("email")
          }), errors.email && /* @__PURE__ */ jsx("span", {
            className: "text-xs text-red-500",
            children: errors.email.message
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "space-y-2",
          children: [/* @__PURE__ */ jsx(Label, {
            htmlFor: "mobile",
            children: "Mobile"
          }), /* @__PURE__ */ jsx(Input, {
            id: "mobile",
            placeholder: "9876543210",
            ...register2("mobile")
          }), errors.mobile && /* @__PURE__ */ jsx("span", {
            className: "text-xs text-red-500",
            children: errors.mobile.message
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "grid grid-cols-2 gap-4",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "space-y-2",
            children: [/* @__PURE__ */ jsx(Label, {
              htmlFor: "password",
              children: "Password"
            }), /* @__PURE__ */ jsx(Input, {
              id: "password",
              type: "password",
              ...register2("password")
            }), errors.password && /* @__PURE__ */ jsx("span", {
              className: "text-xs text-red-500",
              children: errors.password.message
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-2",
            children: [/* @__PURE__ */ jsx(Label, {
              htmlFor: "confirmPassword",
              children: "Confirm"
            }), /* @__PURE__ */ jsx(Input, {
              id: "confirmPassword",
              type: "password",
              ...register2("confirmPassword")
            }), errors.confirmPassword && /* @__PURE__ */ jsx("span", {
              className: "text-xs text-red-500",
              children: errors.confirmPassword.message
            })]
          })]
        }), /* @__PURE__ */ jsx(Button, {
          type: "submit",
          className: "hover-card-glow w-full bg-orange-600 hover:bg-orange-700",
          disabled: isSubmitting,
          children: isSubmitting ? /* @__PURE__ */ jsx(Loader2, {
            className: "mr-2 h-4 w-4 animate-spin"
          }) : "Register"
        })]
      })
    }), /* @__PURE__ */ jsxs(CardFooter, {
      className: "text-center text-sm justify-center text-slate-500",
      children: ["Already have an account?", " ", /* @__PURE__ */ jsx(Link$1, {
        to: "/login",
        className: "font-semibold text-slate-900 hover:underline ml-1",
        children: "Sign In"
      })]
    })]
  });
});
const route29 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: register,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-DNLpXWPL.js", "imports": ["/assets/chunk-EPOLDU6W-ChqI0nxY.js", "/assets/index-BlD4RAcs.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-Bam7uR77.js", "imports": ["/assets/chunk-EPOLDU6W-ChqI0nxY.js", "/assets/index-BlD4RAcs.js"], "css": ["/assets/root-DhxY_14H.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/dashboard-layout": { "id": "routes/dashboard-layout", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/dashboard-layout-DwEq4kNP.js", "imports": ["/assets/chunk-EPOLDU6W-ChqI0nxY.js", "/assets/avatar-CM-enk-h.js", "/assets/button-DJOGF8lk.js", "/assets/loader-circle-CG5p7_HW.js", "/assets/createLucideIcon-LR3f_QN8.js", "/assets/triangle-alert-DFymwYj8.js", "/assets/circle-check-BAn0kiHJ.js", "/assets/utils-B7JaLIXj.js", "/assets/index-DwXCEBPy.js", "/assets/index-DH-9tp7w.js", "/assets/index-DgtmhsrH.js", "/assets/index-BlD4RAcs.js", "/assets/index-DxQ1XJrd.js", "/assets/index-D8PbbR5n.js", "/assets/index-alOY63D0.js", "/assets/index-DTsTNT3G.js", "/assets/index-CvAHIQQn.js", "/assets/chevron-right-LVjP8CF0.js", "/assets/index-DJmqDzNu.js", "/assets/users-Bd0q_q3f.js", "/assets/store-DW8bus8R.js", "/assets/map-pin-Cnwq43Sx.js", "/assets/layers-BWqs2hp3.js", "/assets/warehouse-BbVgCgdG.js", "/assets/percent-DJnI6Z-h.js", "/assets/scale-qAx9iPkM.js", "/assets/truck-BvnvxsX0.js", "/assets/building-2-DjEAMQSJ.js", "/assets/settings-Vj1aZoCz.js", "/assets/user-D_hQC2fz.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "routes/dashboard-layout", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-DsxB8kfb.js", "imports": ["/assets/chunk-EPOLDU6W-ChqI0nxY.js", "/assets/card-D15KGoiH.js", "/assets/avatar-CM-enk-h.js", "/assets/utils-B7JaLIXj.js", "/assets/createLucideIcon-LR3f_QN8.js", "/assets/users-Bd0q_q3f.js", "/assets/index-BlD4RAcs.js", "/assets/arrow-up-right-C9pUrZEM.js", "/assets/index-DgtmhsrH.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/company": { "id": "routes/company", "parentId": "routes/dashboard-layout", "path": "company", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/company-C7M3YDGE.js", "imports": ["/assets/chunk-EPOLDU6W-ChqI0nxY.js", "/assets/label-mxTV5U-j.js", "/assets/schemas-B_p6X6Sd.js", "/assets/button-DJOGF8lk.js", "/assets/input-BQfcJZBc.js", "/assets/card-D15KGoiH.js", "/assets/validators-y24I4gES.js", "/assets/utils-B7JaLIXj.js", "/assets/index-BlD4RAcs.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/customers": { "id": "routes/customers", "parentId": "routes/dashboard-layout", "path": "customers", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/customers-B9VfYX8c.js", "imports": ["/assets/chunk-EPOLDU6W-ChqI0nxY.js", "/assets/label-mxTV5U-j.js", "/assets/schemas-B_p6X6Sd.js", "/assets/button-DJOGF8lk.js", "/assets/input-BQfcJZBc.js", "/assets/card-D15KGoiH.js", "/assets/dialog-DmvohqaA.js", "/assets/select-C51JiXvi.js", "/assets/tabs-yHIkDuZH.js", "/assets/validators-y24I4gES.js", "/assets/plus-2VTDJud4.js", "/assets/credit-card-BESdmjLc.js", "/assets/truck-BvnvxsX0.js", "/assets/user-D_hQC2fz.js", "/assets/phone-BP9WL7bk.js", "/assets/map-pin-Cnwq43Sx.js", "/assets/utils-B7JaLIXj.js", "/assets/index-BlD4RAcs.js", "/assets/createLucideIcon-LR3f_QN8.js", "/assets/index-DwXCEBPy.js", "/assets/index-DH-9tp7w.js", "/assets/index-DgtmhsrH.js", "/assets/index-alOY63D0.js", "/assets/index-DxQ1XJrd.js", "/assets/index-D8PbbR5n.js", "/assets/index-DTsTNT3G.js", "/assets/index-DJmqDzNu.js", "/assets/index-CvAHIQQn.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/sites": { "id": "routes/sites", "parentId": "routes/dashboard-layout", "path": "sites", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/sites-CVCpCNfm.js", "imports": ["/assets/chunk-EPOLDU6W-ChqI0nxY.js", "/assets/label-mxTV5U-j.js", "/assets/schemas-B_p6X6Sd.js", "/assets/button-DJOGF8lk.js", "/assets/input-BQfcJZBc.js", "/assets/card-D15KGoiH.js", "/assets/badge-C5k-Fbw8.js", "/assets/dialog-DmvohqaA.js", "/assets/select-C51JiXvi.js", "/assets/plus-2VTDJud4.js", "/assets/building-2-DjEAMQSJ.js", "/assets/map-pin-Cnwq43Sx.js", "/assets/phone-BP9WL7bk.js", "/assets/utils-B7JaLIXj.js", "/assets/index-BlD4RAcs.js", "/assets/createLucideIcon-LR3f_QN8.js", "/assets/index-DwXCEBPy.js", "/assets/index-DH-9tp7w.js", "/assets/index-DgtmhsrH.js", "/assets/index-alOY63D0.js", "/assets/index-DxQ1XJrd.js", "/assets/index-D8PbbR5n.js", "/assets/index-DTsTNT3G.js", "/assets/index-DJmqDzNu.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/challans": { "id": "routes/challans", "parentId": "routes/dashboard-layout", "path": "challans", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/challans-DL9Otq66.js", "imports": ["/assets/chunk-EPOLDU6W-ChqI0nxY.js", "/assets/label-mxTV5U-j.js", "/assets/schemas-B_p6X6Sd.js", "/assets/button-DJOGF8lk.js", "/assets/input-BQfcJZBc.js", "/assets/card-D15KGoiH.js", "/assets/badge-C5k-Fbw8.js", "/assets/dialog-DmvohqaA.js", "/assets/select-C51JiXvi.js", "/assets/table-DKG8Nq2h.js", "/assets/plus-2VTDJud4.js", "/assets/trash-2-Cgnqpp1H.js", "/assets/arrow-up-right-C9pUrZEM.js", "/assets/utils-B7JaLIXj.js", "/assets/index-BlD4RAcs.js", "/assets/createLucideIcon-LR3f_QN8.js", "/assets/index-DwXCEBPy.js", "/assets/index-DH-9tp7w.js", "/assets/index-DgtmhsrH.js", "/assets/index-alOY63D0.js", "/assets/index-DxQ1XJrd.js", "/assets/index-D8PbbR5n.js", "/assets/index-DTsTNT3G.js", "/assets/index-DJmqDzNu.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/delivery-challans": { "id": "routes/delivery-challans", "parentId": "routes/dashboard-layout", "path": "delivery-challans", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/delivery-challans-14NUUUlh.js", "imports": ["/assets/chunk-EPOLDU6W-ChqI0nxY.js", "/assets/label-mxTV5U-j.js", "/assets/schemas-B_p6X6Sd.js", "/assets/button-DJOGF8lk.js", "/assets/input-BQfcJZBc.js", "/assets/card-D15KGoiH.js", "/assets/select-C51JiXvi.js", "/assets/table-DKG8Nq2h.js", "/assets/textarea-VFn23AkH.js", "/assets/dialog-DmvohqaA.js", "/assets/badge-C5k-Fbw8.js", "/assets/format-B1sj8RnW.js", "/assets/plus-2VTDJud4.js", "/assets/trash-2-Cgnqpp1H.js", "/assets/user-D_hQC2fz.js", "/assets/map-pin-Cnwq43Sx.js", "/assets/truck-BvnvxsX0.js", "/assets/utils-B7JaLIXj.js", "/assets/index-BlD4RAcs.js", "/assets/index-DH-9tp7w.js", "/assets/index-DgtmhsrH.js", "/assets/index-D8PbbR5n.js", "/assets/index-alOY63D0.js", "/assets/index-DTsTNT3G.js", "/assets/index-DJmqDzNu.js", "/assets/createLucideIcon-LR3f_QN8.js", "/assets/index-DwXCEBPy.js", "/assets/index-DxQ1XJrd.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/employees": { "id": "routes/employees", "parentId": "routes/dashboard-layout", "path": "employees", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/employees-Dc9V6R62.js", "imports": ["/assets/chunk-EPOLDU6W-ChqI0nxY.js", "/assets/label-mxTV5U-j.js", "/assets/schemas-B_p6X6Sd.js", "/assets/button-DJOGF8lk.js", "/assets/input-BQfcJZBc.js", "/assets/badge-C5k-Fbw8.js", "/assets/table-DKG8Nq2h.js", "/assets/card-D15KGoiH.js", "/assets/avatar-CM-enk-h.js", "/assets/dialog-DmvohqaA.js", "/assets/select-C51JiXvi.js", "/assets/plus-2VTDJud4.js", "/assets/phone-BP9WL7bk.js", "/assets/createLucideIcon-LR3f_QN8.js", "/assets/utils-B7JaLIXj.js", "/assets/index-BlD4RAcs.js", "/assets/index-DgtmhsrH.js", "/assets/index-DwXCEBPy.js", "/assets/index-DH-9tp7w.js", "/assets/index-alOY63D0.js", "/assets/index-DxQ1XJrd.js", "/assets/index-D8PbbR5n.js", "/assets/index-DTsTNT3G.js", "/assets/index-DJmqDzNu.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/items": { "id": "routes/items", "parentId": "routes/dashboard-layout", "path": "items", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/items-DXfnDQeL.js", "imports": ["/assets/chunk-EPOLDU6W-ChqI0nxY.js", "/assets/label-mxTV5U-j.js", "/assets/schemas-B_p6X6Sd.js", "/assets/button-DJOGF8lk.js", "/assets/input-BQfcJZBc.js", "/assets/badge-C5k-Fbw8.js", "/assets/table-DKG8Nq2h.js", "/assets/select-C51JiXvi.js", "/assets/dialog-DmvohqaA.js", "/assets/validators-y24I4gES.js", "/assets/plus-2VTDJud4.js", "/assets/coerce-CoKk36h9.js", "/assets/utils-B7JaLIXj.js", "/assets/index-BlD4RAcs.js", "/assets/index-DH-9tp7w.js", "/assets/index-DgtmhsrH.js", "/assets/index-D8PbbR5n.js", "/assets/index-alOY63D0.js", "/assets/index-DTsTNT3G.js", "/assets/index-DJmqDzNu.js", "/assets/createLucideIcon-LR3f_QN8.js", "/assets/index-DwXCEBPy.js", "/assets/index-DxQ1XJrd.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/item-groups": { "id": "routes/item-groups", "parentId": "routes/dashboard-layout", "path": "groups", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/item-groups-9_g_A10i.js", "imports": ["/assets/chunk-EPOLDU6W-ChqI0nxY.js", "/assets/label-mxTV5U-j.js", "/assets/schemas-B_p6X6Sd.js", "/assets/button-DJOGF8lk.js", "/assets/input-BQfcJZBc.js", "/assets/card-D15KGoiH.js", "/assets/dialog-DmvohqaA.js", "/assets/plus-2VTDJud4.js", "/assets/layers-BWqs2hp3.js", "/assets/utils-B7JaLIXj.js", "/assets/index-BlD4RAcs.js", "/assets/createLucideIcon-LR3f_QN8.js", "/assets/index-DwXCEBPy.js", "/assets/index-DH-9tp7w.js", "/assets/index-DgtmhsrH.js", "/assets/index-alOY63D0.js", "/assets/index-DxQ1XJrd.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/vendors": { "id": "routes/vendors", "parentId": "routes/dashboard-layout", "path": "vendors", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/vendors-CFl3iQC-.js", "imports": ["/assets/chunk-EPOLDU6W-ChqI0nxY.js", "/assets/label-mxTV5U-j.js", "/assets/schemas-B_p6X6Sd.js", "/assets/button-DJOGF8lk.js", "/assets/input-BQfcJZBc.js", "/assets/card-D15KGoiH.js", "/assets/dialog-DmvohqaA.js", "/assets/select-C51JiXvi.js", "/assets/validators-y24I4gES.js", "/assets/plus-2VTDJud4.js", "/assets/credit-card-BESdmjLc.js", "/assets/truck-BvnvxsX0.js", "/assets/store-DW8bus8R.js", "/assets/map-pin-Cnwq43Sx.js", "/assets/phone-BP9WL7bk.js", "/assets/utils-B7JaLIXj.js", "/assets/index-BlD4RAcs.js", "/assets/createLucideIcon-LR3f_QN8.js", "/assets/index-DwXCEBPy.js", "/assets/index-DH-9tp7w.js", "/assets/index-DgtmhsrH.js", "/assets/index-alOY63D0.js", "/assets/index-DxQ1XJrd.js", "/assets/index-D8PbbR5n.js", "/assets/index-DTsTNT3G.js", "/assets/index-DJmqDzNu.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/warehouses": { "id": "routes/warehouses", "parentId": "routes/dashboard-layout", "path": "warehouses", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/warehouses-1KRs3To6.js", "imports": ["/assets/chunk-EPOLDU6W-ChqI0nxY.js", "/assets/label-mxTV5U-j.js", "/assets/schemas-B_p6X6Sd.js", "/assets/button-DJOGF8lk.js", "/assets/input-BQfcJZBc.js", "/assets/card-D15KGoiH.js", "/assets/dialog-DmvohqaA.js", "/assets/plus-2VTDJud4.js", "/assets/warehouse-BbVgCgdG.js", "/assets/utils-B7JaLIXj.js", "/assets/index-BlD4RAcs.js", "/assets/createLucideIcon-LR3f_QN8.js", "/assets/index-DwXCEBPy.js", "/assets/index-DH-9tp7w.js", "/assets/index-DgtmhsrH.js", "/assets/index-alOY63D0.js", "/assets/index-DxQ1XJrd.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/currencies": { "id": "routes/currencies", "parentId": "routes/dashboard-layout", "path": "currencies", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/currencies-4X9trmrA.js", "imports": ["/assets/chunk-EPOLDU6W-ChqI0nxY.js", "/assets/label-mxTV5U-j.js", "/assets/schemas-B_p6X6Sd.js", "/assets/button-DJOGF8lk.js", "/assets/card-D15KGoiH.js", "/assets/dialog-DmvohqaA.js", "/assets/select-C51JiXvi.js", "/assets/plus-2VTDJud4.js", "/assets/utils-B7JaLIXj.js", "/assets/index-BlD4RAcs.js", "/assets/createLucideIcon-LR3f_QN8.js", "/assets/index-DwXCEBPy.js", "/assets/index-DH-9tp7w.js", "/assets/index-DgtmhsrH.js", "/assets/index-alOY63D0.js", "/assets/index-DxQ1XJrd.js", "/assets/index-D8PbbR5n.js", "/assets/index-DTsTNT3G.js", "/assets/index-DJmqDzNu.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/inventory-inward": { "id": "routes/inventory-inward", "parentId": "routes/dashboard-layout", "path": "inventory/inward", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/inventory-inward-DnfGPzAx.js", "imports": ["/assets/chunk-EPOLDU6W-ChqI0nxY.js", "/assets/label-mxTV5U-j.js", "/assets/schemas-B_p6X6Sd.js", "/assets/button-DJOGF8lk.js", "/assets/input-BQfcJZBc.js", "/assets/card-D15KGoiH.js", "/assets/select-C51JiXvi.js", "/assets/table-DKG8Nq2h.js", "/assets/textarea-VFn23AkH.js", "/assets/search-DMpuD63j.js", "/assets/trash-2-Cgnqpp1H.js", "/assets/plus-2VTDJud4.js", "/assets/save-a7TbwWQM.js", "/assets/format-B1sj8RnW.js", "/assets/utils-B7JaLIXj.js", "/assets/index-BlD4RAcs.js", "/assets/index-DH-9tp7w.js", "/assets/index-DgtmhsrH.js", "/assets/index-D8PbbR5n.js", "/assets/index-alOY63D0.js", "/assets/index-DTsTNT3G.js", "/assets/index-DJmqDzNu.js", "/assets/createLucideIcon-LR3f_QN8.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/inventory-outward": { "id": "routes/inventory-outward", "parentId": "routes/dashboard-layout", "path": "inventory/outward", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/inventory-outward-CFN3bx2p.js", "imports": ["/assets/chunk-EPOLDU6W-ChqI0nxY.js", "/assets/label-mxTV5U-j.js", "/assets/schemas-B_p6X6Sd.js", "/assets/button-DJOGF8lk.js", "/assets/input-BQfcJZBc.js", "/assets/card-D15KGoiH.js", "/assets/select-C51JiXvi.js", "/assets/table-DKG8Nq2h.js", "/assets/textarea-VFn23AkH.js", "/assets/circle-arrow-up-CBXlPBvm.js", "/assets/search-DMpuD63j.js", "/assets/trash-2-Cgnqpp1H.js", "/assets/plus-2VTDJud4.js", "/assets/save-a7TbwWQM.js", "/assets/format-B1sj8RnW.js", "/assets/utils-B7JaLIXj.js", "/assets/index-BlD4RAcs.js", "/assets/index-DH-9tp7w.js", "/assets/index-DgtmhsrH.js", "/assets/index-D8PbbR5n.js", "/assets/index-alOY63D0.js", "/assets/index-DTsTNT3G.js", "/assets/index-DJmqDzNu.js", "/assets/createLucideIcon-LR3f_QN8.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/inventory": { "id": "routes/inventory", "parentId": "routes/dashboard-layout", "path": "inventory", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/inventory-HB7Ms6qq.js", "imports": ["/assets/chunk-EPOLDU6W-ChqI0nxY.js", "/assets/label-mxTV5U-j.js", "/assets/schemas-B_p6X6Sd.js", "/assets/button-DJOGF8lk.js", "/assets/input-BQfcJZBc.js", "/assets/card-D15KGoiH.js", "/assets/select-C51JiXvi.js", "/assets/table-DKG8Nq2h.js", "/assets/textarea-VFn23AkH.js", "/assets/tabs-yHIkDuZH.js", "/assets/badge-C5k-Fbw8.js", "/assets/createLucideIcon-LR3f_QN8.js", "/assets/circle-arrow-up-CBXlPBvm.js", "/assets/search-DMpuD63j.js", "/assets/trash-2-Cgnqpp1H.js", "/assets/plus-2VTDJud4.js", "/assets/save-a7TbwWQM.js", "/assets/clock-CSYFBwrg.js", "/assets/chevron-left-CEE7dwDr.js", "/assets/chevron-right-LVjP8CF0.js", "/assets/format-B1sj8RnW.js", "/assets/utils-B7JaLIXj.js", "/assets/index-BlD4RAcs.js", "/assets/index-DH-9tp7w.js", "/assets/index-DgtmhsrH.js", "/assets/index-D8PbbR5n.js", "/assets/index-alOY63D0.js", "/assets/index-DTsTNT3G.js", "/assets/index-DJmqDzNu.js", "/assets/index-CvAHIQQn.js", "/assets/index-DxQ1XJrd.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/fiscal-years": { "id": "routes/fiscal-years", "parentId": "routes/dashboard-layout", "path": "fiscal-years", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/fiscal-years-Dp2DYmnY.js", "imports": ["/assets/chunk-EPOLDU6W-ChqI0nxY.js", "/assets/label-mxTV5U-j.js", "/assets/schemas-B_p6X6Sd.js", "/assets/button-DJOGF8lk.js", "/assets/card-D15KGoiH.js", "/assets/dialog-DmvohqaA.js", "/assets/table-DKG8Nq2h.js", "/assets/format-B1sj8RnW.js", "/assets/utils-B7JaLIXj.js", "/assets/chevron-right-LVjP8CF0.js", "/assets/chevron-left-CEE7dwDr.js", "/assets/index-DH-9tp7w.js", "/assets/index-alOY63D0.js", "/assets/index-DTsTNT3G.js", "/assets/index-DxQ1XJrd.js", "/assets/index-BlD4RAcs.js", "/assets/plus-2VTDJud4.js", "/assets/createLucideIcon-LR3f_QN8.js", "/assets/circle-check-BAn0kiHJ.js", "/assets/index-DwXCEBPy.js", "/assets/index-DgtmhsrH.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/tax-codes": { "id": "routes/tax-codes", "parentId": "routes/dashboard-layout", "path": "tax-codes", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/tax-codes-BFHGOTmH.js", "imports": ["/assets/chunk-EPOLDU6W-ChqI0nxY.js", "/assets/label-mxTV5U-j.js", "/assets/schemas-B_p6X6Sd.js", "/assets/button-DJOGF8lk.js", "/assets/input-BQfcJZBc.js", "/assets/card-D15KGoiH.js", "/assets/dialog-DmvohqaA.js", "/assets/plus-2VTDJud4.js", "/assets/percent-DJnI6Z-h.js", "/assets/coerce-CoKk36h9.js", "/assets/utils-B7JaLIXj.js", "/assets/index-BlD4RAcs.js", "/assets/createLucideIcon-LR3f_QN8.js", "/assets/index-DwXCEBPy.js", "/assets/index-DH-9tp7w.js", "/assets/index-DgtmhsrH.js", "/assets/index-alOY63D0.js", "/assets/index-DxQ1XJrd.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/sales": { "id": "routes/sales", "parentId": "routes/dashboard-layout", "path": "sales", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/sales-bjzazyay.js", "imports": ["/assets/chunk-EPOLDU6W-ChqI0nxY.js", "/assets/label-mxTV5U-j.js", "/assets/schemas-B_p6X6Sd.js", "/assets/button-DJOGF8lk.js", "/assets/input-BQfcJZBc.js", "/assets/card-D15KGoiH.js", "/assets/select-C51JiXvi.js", "/assets/table-DKG8Nq2h.js", "/assets/tabs-yHIkDuZH.js", "/assets/badge-C5k-Fbw8.js", "/assets/createLucideIcon-LR3f_QN8.js", "/assets/plus-2VTDJud4.js", "/assets/trash-2-Cgnqpp1H.js", "/assets/save-a7TbwWQM.js", "/assets/clock-CSYFBwrg.js", "/assets/chevron-left-CEE7dwDr.js", "/assets/chevron-right-LVjP8CF0.js", "/assets/coerce-CoKk36h9.js", "/assets/format-B1sj8RnW.js", "/assets/utils-B7JaLIXj.js", "/assets/index-BlD4RAcs.js", "/assets/index-DH-9tp7w.js", "/assets/index-DgtmhsrH.js", "/assets/index-D8PbbR5n.js", "/assets/index-alOY63D0.js", "/assets/index-DTsTNT3G.js", "/assets/index-DJmqDzNu.js", "/assets/index-CvAHIQQn.js", "/assets/index-DxQ1XJrd.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/users": { "id": "routes/users", "parentId": "routes/dashboard-layout", "path": "users", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/users-DTW0EM4A.js", "imports": ["/assets/chunk-EPOLDU6W-ChqI0nxY.js", "/assets/label-mxTV5U-j.js", "/assets/schemas-B_p6X6Sd.js", "/assets/button-DJOGF8lk.js", "/assets/input-BQfcJZBc.js", "/assets/card-D15KGoiH.js", "/assets/badge-C5k-Fbw8.js", "/assets/dialog-DmvohqaA.js", "/assets/select-C51JiXvi.js", "/assets/plus-2VTDJud4.js", "/assets/utils-B7JaLIXj.js", "/assets/index-BlD4RAcs.js", "/assets/createLucideIcon-LR3f_QN8.js", "/assets/index-DwXCEBPy.js", "/assets/index-DH-9tp7w.js", "/assets/index-DgtmhsrH.js", "/assets/index-alOY63D0.js", "/assets/index-DxQ1XJrd.js", "/assets/index-D8PbbR5n.js", "/assets/index-DTsTNT3G.js", "/assets/index-DJmqDzNu.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/profile": { "id": "routes/profile", "parentId": "routes/dashboard-layout", "path": "profile", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/profile-DjAa_mz7.js", "imports": ["/assets/chunk-EPOLDU6W-ChqI0nxY.js", "/assets/label-mxTV5U-j.js", "/assets/button-DJOGF8lk.js", "/assets/input-BQfcJZBc.js", "/assets/card-D15KGoiH.js", "/assets/tabs-yHIkDuZH.js", "/assets/save-a7TbwWQM.js", "/assets/utils-B7JaLIXj.js", "/assets/index-BlD4RAcs.js", "/assets/index-DH-9tp7w.js", "/assets/index-DgtmhsrH.js", "/assets/index-CvAHIQQn.js", "/assets/index-D8PbbR5n.js", "/assets/index-DxQ1XJrd.js", "/assets/createLucideIcon-LR3f_QN8.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/settings": { "id": "routes/settings", "parentId": "routes/dashboard-layout", "path": "settings", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/settings-YF9EDZeW.js", "imports": ["/assets/chunk-EPOLDU6W-ChqI0nxY.js", "/assets/label-mxTV5U-j.js", "/assets/button-DJOGF8lk.js", "/assets/input-BQfcJZBc.js", "/assets/card-D15KGoiH.js", "/assets/textarea-VFn23AkH.js", "/assets/settings-Vj1aZoCz.js", "/assets/save-a7TbwWQM.js", "/assets/utils-B7JaLIXj.js", "/assets/index-BlD4RAcs.js", "/assets/createLucideIcon-LR3f_QN8.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/states": { "id": "routes/states", "parentId": "routes/dashboard-layout", "path": "states", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/states-DqVj74QQ.js", "imports": ["/assets/chunk-EPOLDU6W-ChqI0nxY.js", "/assets/label-mxTV5U-j.js", "/assets/schemas-B_p6X6Sd.js", "/assets/button-DJOGF8lk.js", "/assets/input-BQfcJZBc.js", "/assets/card-D15KGoiH.js", "/assets/dialog-DmvohqaA.js", "/assets/table-DKG8Nq2h.js", "/assets/loader-circle-CG5p7_HW.js", "/assets/createLucideIcon-LR3f_QN8.js", "/assets/plus-2VTDJud4.js", "/assets/utils-B7JaLIXj.js", "/assets/index-BlD4RAcs.js", "/assets/index-DwXCEBPy.js", "/assets/index-DH-9tp7w.js", "/assets/index-DgtmhsrH.js", "/assets/index-alOY63D0.js", "/assets/index-DxQ1XJrd.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/rental-grn": { "id": "routes/rental-grn", "parentId": "routes/dashboard-layout", "path": "rental-grn", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/rental-grn-B3R8pwmX.js", "imports": ["/assets/chunk-EPOLDU6W-ChqI0nxY.js", "/assets/label-mxTV5U-j.js", "/assets/schemas-B_p6X6Sd.js", "/assets/button-DJOGF8lk.js", "/assets/input-BQfcJZBc.js", "/assets/card-D15KGoiH.js", "/assets/select-C51JiXvi.js", "/assets/table-DKG8Nq2h.js", "/assets/textarea-VFn23AkH.js", "/assets/dialog-DmvohqaA.js", "/assets/badge-C5k-Fbw8.js", "/assets/plus-2VTDJud4.js", "/assets/trash-2-Cgnqpp1H.js", "/assets/user-D_hQC2fz.js", "/assets/map-pin-Cnwq43Sx.js", "/assets/format-B1sj8RnW.js", "/assets/utils-B7JaLIXj.js", "/assets/index-BlD4RAcs.js", "/assets/index-DH-9tp7w.js", "/assets/index-DgtmhsrH.js", "/assets/index-D8PbbR5n.js", "/assets/index-alOY63D0.js", "/assets/index-DTsTNT3G.js", "/assets/index-DJmqDzNu.js", "/assets/createLucideIcon-LR3f_QN8.js", "/assets/index-DwXCEBPy.js", "/assets/index-DxQ1XJrd.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/missing-entries": { "id": "routes/missing-entries", "parentId": "routes/dashboard-layout", "path": "missing-entries", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/missing-entries-DXsNza5o.js", "imports": ["/assets/chunk-EPOLDU6W-ChqI0nxY.js", "/assets/label-mxTV5U-j.js", "/assets/schemas-B_p6X6Sd.js", "/assets/button-DJOGF8lk.js", "/assets/input-BQfcJZBc.js", "/assets/card-D15KGoiH.js", "/assets/select-C51JiXvi.js", "/assets/table-DKG8Nq2h.js", "/assets/textarea-VFn23AkH.js", "/assets/dialog-DmvohqaA.js", "/assets/badge-C5k-Fbw8.js", "/assets/plus-2VTDJud4.js", "/assets/triangle-alert-DFymwYj8.js", "/assets/trash-2-Cgnqpp1H.js", "/assets/user-D_hQC2fz.js", "/assets/map-pin-Cnwq43Sx.js", "/assets/createLucideIcon-LR3f_QN8.js", "/assets/format-B1sj8RnW.js", "/assets/utils-B7JaLIXj.js", "/assets/index-BlD4RAcs.js", "/assets/index-DH-9tp7w.js", "/assets/index-DgtmhsrH.js", "/assets/index-D8PbbR5n.js", "/assets/index-alOY63D0.js", "/assets/index-DTsTNT3G.js", "/assets/index-DJmqDzNu.js", "/assets/index-DwXCEBPy.js", "/assets/index-DxQ1XJrd.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/adjustments": { "id": "routes/adjustments", "parentId": "routes/dashboard-layout", "path": "adjustments", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/adjustments-CjjLF8R9.js", "imports": ["/assets/chunk-EPOLDU6W-ChqI0nxY.js", "/assets/label-mxTV5U-j.js", "/assets/schemas-B_p6X6Sd.js", "/assets/button-DJOGF8lk.js", "/assets/input-BQfcJZBc.js", "/assets/card-D15KGoiH.js", "/assets/select-C51JiXvi.js", "/assets/table-DKG8Nq2h.js", "/assets/dialog-DmvohqaA.js", "/assets/badge-C5k-Fbw8.js", "/assets/plus-2VTDJud4.js", "/assets/createLucideIcon-LR3f_QN8.js", "/assets/trash-2-Cgnqpp1H.js", "/assets/user-D_hQC2fz.js", "/assets/map-pin-Cnwq43Sx.js", "/assets/truck-BvnvxsX0.js", "/assets/scale-qAx9iPkM.js", "/assets/format-B1sj8RnW.js", "/assets/utils-B7JaLIXj.js", "/assets/index-BlD4RAcs.js", "/assets/index-DH-9tp7w.js", "/assets/index-DgtmhsrH.js", "/assets/index-D8PbbR5n.js", "/assets/index-alOY63D0.js", "/assets/index-DTsTNT3G.js", "/assets/index-DJmqDzNu.js", "/assets/index-DwXCEBPy.js", "/assets/index-DxQ1XJrd.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/auth-layout": { "id": "routes/auth-layout", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/auth-layout-B0ch_4FI.js", "imports": ["/assets/chunk-EPOLDU6W-ChqI0nxY.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/login": { "id": "routes/login", "parentId": "routes/auth-layout", "path": "login", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/login-DnrDuM6-.js", "imports": ["/assets/chunk-EPOLDU6W-ChqI0nxY.js", "/assets/label-mxTV5U-j.js", "/assets/schemas-B_p6X6Sd.js", "/assets/button-DJOGF8lk.js", "/assets/input-BQfcJZBc.js", "/assets/card-D15KGoiH.js", "/assets/loader-circle-CG5p7_HW.js", "/assets/utils-B7JaLIXj.js", "/assets/index-BlD4RAcs.js", "/assets/createLucideIcon-LR3f_QN8.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/register": { "id": "routes/register", "parentId": "routes/auth-layout", "path": "register", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/register-BjgUIt1r.js", "imports": ["/assets/chunk-EPOLDU6W-ChqI0nxY.js", "/assets/label-mxTV5U-j.js", "/assets/schemas-B_p6X6Sd.js", "/assets/button-DJOGF8lk.js", "/assets/input-BQfcJZBc.js", "/assets/card-D15KGoiH.js", "/assets/circle-check-BAn0kiHJ.js", "/assets/createLucideIcon-LR3f_QN8.js", "/assets/loader-circle-CG5p7_HW.js", "/assets/utils-B7JaLIXj.js", "/assets/index-BlD4RAcs.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-37ca31d7.js", "version": "37ca31d7", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_optimizeDeps": false, "unstable_subResourceIntegrity": false, "unstable_trailingSlashAwareDataRequests": false, "v8_middleware": false, "v8_splitRouteModules": false, "v8_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/dashboard-layout": {
    id: "routes/dashboard-layout",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/home": {
    id: "routes/home",
    parentId: "routes/dashboard-layout",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route2
  },
  "routes/company": {
    id: "routes/company",
    parentId: "routes/dashboard-layout",
    path: "company",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/customers": {
    id: "routes/customers",
    parentId: "routes/dashboard-layout",
    path: "customers",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/sites": {
    id: "routes/sites",
    parentId: "routes/dashboard-layout",
    path: "sites",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/challans": {
    id: "routes/challans",
    parentId: "routes/dashboard-layout",
    path: "challans",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/delivery-challans": {
    id: "routes/delivery-challans",
    parentId: "routes/dashboard-layout",
    path: "delivery-challans",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/employees": {
    id: "routes/employees",
    parentId: "routes/dashboard-layout",
    path: "employees",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "routes/items": {
    id: "routes/items",
    parentId: "routes/dashboard-layout",
    path: "items",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "routes/item-groups": {
    id: "routes/item-groups",
    parentId: "routes/dashboard-layout",
    path: "groups",
    index: void 0,
    caseSensitive: void 0,
    module: route10
  },
  "routes/vendors": {
    id: "routes/vendors",
    parentId: "routes/dashboard-layout",
    path: "vendors",
    index: void 0,
    caseSensitive: void 0,
    module: route11
  },
  "routes/warehouses": {
    id: "routes/warehouses",
    parentId: "routes/dashboard-layout",
    path: "warehouses",
    index: void 0,
    caseSensitive: void 0,
    module: route12
  },
  "routes/currencies": {
    id: "routes/currencies",
    parentId: "routes/dashboard-layout",
    path: "currencies",
    index: void 0,
    caseSensitive: void 0,
    module: route13
  },
  "routes/inventory-inward": {
    id: "routes/inventory-inward",
    parentId: "routes/dashboard-layout",
    path: "inventory/inward",
    index: void 0,
    caseSensitive: void 0,
    module: route14
  },
  "routes/inventory-outward": {
    id: "routes/inventory-outward",
    parentId: "routes/dashboard-layout",
    path: "inventory/outward",
    index: void 0,
    caseSensitive: void 0,
    module: route15
  },
  "routes/inventory": {
    id: "routes/inventory",
    parentId: "routes/dashboard-layout",
    path: "inventory",
    index: void 0,
    caseSensitive: void 0,
    module: route16
  },
  "routes/fiscal-years": {
    id: "routes/fiscal-years",
    parentId: "routes/dashboard-layout",
    path: "fiscal-years",
    index: void 0,
    caseSensitive: void 0,
    module: route17
  },
  "routes/tax-codes": {
    id: "routes/tax-codes",
    parentId: "routes/dashboard-layout",
    path: "tax-codes",
    index: void 0,
    caseSensitive: void 0,
    module: route18
  },
  "routes/sales": {
    id: "routes/sales",
    parentId: "routes/dashboard-layout",
    path: "sales",
    index: void 0,
    caseSensitive: void 0,
    module: route19
  },
  "routes/users": {
    id: "routes/users",
    parentId: "routes/dashboard-layout",
    path: "users",
    index: void 0,
    caseSensitive: void 0,
    module: route20
  },
  "routes/profile": {
    id: "routes/profile",
    parentId: "routes/dashboard-layout",
    path: "profile",
    index: void 0,
    caseSensitive: void 0,
    module: route21
  },
  "routes/settings": {
    id: "routes/settings",
    parentId: "routes/dashboard-layout",
    path: "settings",
    index: void 0,
    caseSensitive: void 0,
    module: route22
  },
  "routes/states": {
    id: "routes/states",
    parentId: "routes/dashboard-layout",
    path: "states",
    index: void 0,
    caseSensitive: void 0,
    module: route23
  },
  "routes/rental-grn": {
    id: "routes/rental-grn",
    parentId: "routes/dashboard-layout",
    path: "rental-grn",
    index: void 0,
    caseSensitive: void 0,
    module: route24
  },
  "routes/missing-entries": {
    id: "routes/missing-entries",
    parentId: "routes/dashboard-layout",
    path: "missing-entries",
    index: void 0,
    caseSensitive: void 0,
    module: route25
  },
  "routes/adjustments": {
    id: "routes/adjustments",
    parentId: "routes/dashboard-layout",
    path: "adjustments",
    index: void 0,
    caseSensitive: void 0,
    module: route26
  },
  "routes/auth-layout": {
    id: "routes/auth-layout",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route27
  },
  "routes/login": {
    id: "routes/login",
    parentId: "routes/auth-layout",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: route28
  },
  "routes/register": {
    id: "routes/register",
    parentId: "routes/auth-layout",
    path: "register",
    index: void 0,
    caseSensitive: void 0,
    module: route29
  }
};
const allowedActionOrigins = false;
export {
  allowedActionOrigins,
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
