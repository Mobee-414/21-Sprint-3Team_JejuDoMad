"use client";

import * as React from "react";
import {
  DayPicker,
  getDefaultClassNames,
  UI,
  useDayPicker,
  type DayButtonProps,
  type Locale,
  type MonthCaptionProps,
} from "react-day-picker";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type CalendarSize = "sm" | "md" | "lg";

type CalendarStyle = React.CSSProperties & {
  "--calendar-width"?: string;
  "--calendar-weekday-width"?: string;
  "--calendar-weekday-height"?: string;
  "--calendar-day-width"?: string;
  "--calendar-day-height"?: string;
  "--calendar-day-button-width"?: string;
  "--calendar-day-button-height"?: string;
};

type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  size?: CalendarSize;
  style?: CalendarStyle;
};

const calendarSizeStyles = {
  sm: {
    root: "bg-background [--calendar-width:359px] w-full",
    monthCaption: "flex h-[40px] w-full items-center justify-center",
    captionInner: "flex h-full w-full items-center justify-center gap-[8px]",
    captionText: "inline-flex items-center text-16-b text-foreground",
    navButton: "inline-flex h-[24px] w-[24px] items-center justify-center",
    weekdays: "flex w-full justify-between border-b border-border",
    weekday:
      "flex h-[40px] w-[calc(100%/7)] items-center justify-center text-12-m text-muted-foreground",
    week: "flex w-full justify-between gap-[4px]",
    day: "flex h-[46px] w-[calc(100%/7)] items-center justify-center",
    dayButton:
      "flex h-[46px] w-[46px] items-center justify-center rounded-full text-14-m",
    weekNumber: "hidden",
  },
  md: {
    root: "bg-background px-[8px] [--calendar-width:350px]",
    monthCaption: "flex h-[44px] w-full items-center justify-center",
    captionInner:
      "flex h-full w-full translate-y-[1px] items-center justify-center gap-[12px]",
    captionText:
      "inline-flex translate-y-[1px] items-center text-16-b leading-none text-foreground",
    navButton:
      "inline-flex h-[24px] w-[24px] shrink-0 items-center justify-center disabled:opacity-40",
    weekday:
      "h-[var(--calendar-weekday-height,32px)] w-[var(--calendar-weekday-width,40px)] text-14-m",
    week: "mt-[12px]",
    day: "h-[var(--calendar-day-height,46px)] w-[var(--calendar-day-width,46px)] p-0",
    dayButton:
      "inline-flex h-[var(--calendar-day-button-height,40px)] w-[var(--calendar-day-button-width,40px)] items-center justify-center rounded-full p-0 text-[14px] leading-none",
    weekNumber:
      "h-[var(--calendar-weekday-height,32px)] w-[var(--calendar-weekday-width,40px)]",
  },
  lg: {
    root: "rounded-[24px] bg-background pb-2 shadow-[0_4px_24px_0_rgba(156,180,202,0.2)] w-full [--calendar-width:640px]",
    monthCaption: "flex h-[56px] w-full items-center justify-center",
    captionInner:
      "flex h-full w-full items-center justify-center gap-4 translate-y-[1px] mb-8 mt-5",
    captionText:
      "inline-flex translate-y-[1px] items-center text-20-b leading-none text-foreground",
    navButton:
      "inline-flex h-[32px] w-[32px] shrink-0 items-center justify-center disabled:opacity-40",
    weekday:
      "h-[var(--calendar-weekday-height,40px)] w-[calc(100%/7)] text-16-b",
    week: "mt-5 ",
    day: "h-[var(--calendar-day-height,124px)] w-[calc(100%/7)] p-0 align-top text-16-m",
    dayButton:
      "inline-flex h-full w-full items-start justify-center rounded-none p-[8px] pt-[16px] text-left leading-none",
    weekNumber: "h-[var(--calendar-weekday-height,40px)] w-[calc(100%/7)]",
    outside: "text-[#B3B4BC] opacity-100",
  },
} as const;

function CustomMonthCaption({
  calendarMonth,
  size = "md",
}: MonthCaptionProps & { size?: CalendarSize }) {
  const { previousMonth, nextMonth, goToMonth } = useDayPicker();
  const styles = calendarSizeStyles[size];

  return (
    <div className="h-full w-full">
      <div className={styles.captionInner}>
        <button
          type="button"
          onClick={() => previousMonth && goToMonth(previousMonth)}
          disabled={!previousMonth}
          className={styles.navButton}
        >
          <ChevronLeftIcon className="h-[16px] w-[16px]" />
        </button>

        <div className={styles.captionText}>
          {format(calendarMonth.date, "yyyy년 M월", { locale: ko })}
        </div>

        <button
          type="button"
          onClick={() => nextMonth && goToMonth(nextMonth)}
          disabled={!nextMonth}
          className={styles.navButton}
        >
          <ChevronRightIcon className="h-[16px] w-[16px]" />
        </button>
      </div>
    </div>
  );
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  locale,
  formatters,
  components,
  size = "md",
  style,
  ...props
}: CalendarProps) {
  const defaultClassNames = getDefaultClassNames();
  const styles = calendarSizeStyles[size];

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      captionLayout={captionLayout}
      locale={locale}
      style={style}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString(locale?.code, { month: "short" }),
        formatWeekdayName: (date) =>
          date.toLocaleDateString("en-US", { weekday: "narrow" }),
        ...formatters,
      }}
      className={cn(
        "group/calendar w-full [--cell-radius:var(--radius-md)] in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        styles.root,
        className,
      )}
      classNames={{
        root: cn(defaultClassNames.root, "w-full overflow-hidden"),
        months: cn(defaultClassNames.months, "flex w-full flex-col"),
        month: cn(defaultClassNames.month, "flex w-full flex-col"),
        month_caption: styles.monthCaption,
        caption_label: "hidden",
        nav: "hidden",
        button_previous: "hidden",
        button_next: "hidden",
        dropdowns: cn(
          defaultClassNames.dropdowns,
          "flex items-center gap-[6px]",
        ),
        dropdown_root: cn(
          defaultClassNames.dropdown_root,
          "relative rounded-[24px]",
        ),
        dropdown: cn(
          defaultClassNames.dropdown,
          "absolute inset-0 bg-popover opacity-0",
        ),
        month_grid: cn(defaultClassNames.month_grid, "w-full border-collapse"),
        weekdays: cn(
          defaultClassNames.weekdays,
          "mt-[8px] flex w-full justify-between border-b border-border",
        ),
        weekday: cn(
          defaultClassNames.weekday,
          "flex items-center justify-center text-muted-foreground",
          styles.weekday,
        ),
        week: cn(
          defaultClassNames.week,
          "flex w-full justify-between border-b border-border last:border-b-0",
          styles.week,
        ),
        day: cn(
          defaultClassNames.day,
          "relative text-center align-top",
          styles.day,
        ),
        today: cn(defaultClassNames.today),
        outside: cn(
          defaultClassNames.outside,
          "text-muted-foreground aria-selected:text-muted-foreground",
        ),
        disabled: cn(
          defaultClassNames.disabled,
          "text-muted-foreground opacity-50",
        ),
        hidden: cn(defaultClassNames.hidden, "invisible"),
        ...classNames,
      }}
      components={{
        Root: ({ className: rootClassName, rootRef, ...rootProps }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(rootClassName)}
              {...rootProps}
            />
          );
        },
        MonthCaption: (captionProps) => (
          <CustomMonthCaption {...captionProps} size={size} />
        ),
        Chevron: ({ className: iconClassName, orientation, ...iconProps }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon
                className={cn("h-[16px] w-[16px]", iconClassName)}
                {...iconProps}
              />
            );
          }

          if (orientation === "right") {
            return (
              <ChevronRightIcon
                className={cn("h-[16px] w-[16px]", iconClassName)}
                {...iconProps}
              />
            );
          }

          return (
            <ChevronDownIcon
              className={cn("h-[16px] w-[16px]", iconClassName)}
              {...iconProps}
            />
          );
        },
        DayButton: (dayButtonProps) => (
          <CalendarDayButton locale={locale} size={size} {...dayButtonProps} />
        ),
        WeekNumber: ({ children, ...weekNumberProps }) => {
          return (
            <td {...weekNumberProps}>
              <div
                className={cn(
                  "flex items-center justify-center text-center",
                  styles.weekNumber,
                )}
              >
                {children}
              </div>
            </td>
          );
        },
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  size = "md",
  ...props
}: DayButtonProps & {
  locale?: Partial<Locale>;
  size?: CalendarSize;
}) {
  const { classNames } = useDayPicker();
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (modifiers.focused) {
      ref.current?.focus();
    }
  }, [modifiers.focused]);

  if (size === "lg") {
    return (
      <Button
        ref={ref}
        variant="ghost"
        data-day={day.date.toLocaleDateString(locale?.code)}
        data-selected-single={
          modifiers.selected &&
          !modifiers.range_start &&
          !modifiers.range_end &&
          !modifiers.range_middle
        }
        data-range-start={modifiers.range_start}
        data-range-end={modifiers.range_end}
        data-range-middle={modifiers.range_middle}
        className={cn(
          classNames[UI.DayButton],
          "relative isolate z-10 border-0",
          "group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-[3px] group-data-[focused=true]/day:ring-ring/50",
          "data-[range-end=true]:rounded-(--cell-radius) data-[range-end=true]:rounded-r-(--cell-radius) data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground",
          "data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-muted data-[range-middle=true]:text-foreground",
          "data-[range-start=true]:rounded-(--cell-radius) data-[range-start=true]:rounded-l-(--cell-radius) data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground",
          "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground",
          "dark:hover:text-foreground",
          calendarSizeStyles.lg.dayButton,
          className,
        )}
        {...props}
      >
        {day.date.getDate()}
      </Button>
    );
  }

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        classNames[UI.DayButton],
        "relative isolate z-10 flex aspect-square size-auto flex-col gap-[4px] border-0 leading-none font-normal",
        "group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-[3px] group-data-[focused=true]/day:ring-ring/50",
        "data-[range-end=true]:rounded-(--cell-radius) data-[range-end=true]:rounded-r-(--cell-radius) data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground",
        "data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-muted data-[range-middle=true]:text-foreground",
        "data-[range-start=true]:rounded-(--cell-radius) data-[range-start=true]:rounded-l-(--cell-radius) data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground",
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground",
        "dark:hover:text-foreground [&>span]:text-[12px] [&>span]:opacity-70",
        modifiers.today && !modifiers.selected && "bg-primary/20 text-primary",
        calendarSizeStyles[size].dayButton,
        className,
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
