//author: Minjie(Zoe) Zuo

"use client";

type Note = {
    id: string;
    text: string;
    createdAt: string;
};

type NoteCardProps = {
    note: Note;
    onDelete: () => void;
};

//for random sticky-note colors
const pastelColors = [
    "bg-amber-200",
    "bg-rose-200",
    "bg-emerald-200",
    "bg-blue-200",
    "bg-violet-200",
    "bg-pink-200",
    "bg-lime-200",
    "bg-orange-200",
];

//give each sticky note a random color from pastelColors
function pickColorFromDate(createdAt: string): string {
    let sum = 0;
    for (let i = 0; i < createdAt.length; i++) sum += createdAt.charCodeAt(i);
    return pastelColors[sum % pastelColors.length];
}

export default function NoteCard({ note, onDelete }: NoteCardProps) {
    const colorClass = pickColorFromDate(note.createdAt);//chooses a pastel background color based on when the note was created.
    const tilt = Math.random() * 6 - 3; //give the sticky note a little tilt, a small random tilt between -3° and +3°.

    return (

        /**
         * STYLING EXPLANATION
         * <article> is used because each sticky note is a self-contained piece of content-->improves overall accessibility.
         * i used min-weight because i want to ensures the note never becomes too short visually.

         * for Hover action buttons:
         *  flex + flex-col + gap-1 stack the buttons vertically with spacing.
         *  opacity-0 + group-hover:opacity-100 hides them until the user hovers over the note and transition-opacity makes the fade-in smooth.
         *    - Small text size and compact padding match the proportions of the sticky note.
         */

        <article
            className={`group relative rounded-xl shadow-md px-4 py-3 min-h-[110px] min-w-[180px] max-w-[220px] ${colorClass} font-['Edu_VIC_WA_NT_Beginner'] border border-black/10`}
            style={{ transform: `rotate(${tilt}deg)` }}
        >

            {/* underline effect */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,transparent_95%,rgba(0,0,0,0.08)_100%)] bg-[length:100%_1.6rem]" />

            {/*breakwords:If a word is too long to fit, break it instead of overflowing.*/}
            <p className="relative text-base whitespace-pre-wrap leading-relaxed pr-10 break-words">
                {note.text}
            </p>


            {/* hover actions */}
            <div
                className="absolute top-2 right-1 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
                <button
                    onClick={onDelete}
                    className="text-[10px] px-2 py-1 rounded bg-emerald-500 text-white hover:bg-emerald-600"
                >
                    Complete
                </button>

                <button
                    onClick={onDelete}
                    className="text-[10px] px-2 py-1 rounded bg-rose-500 text-white hover:bg-rose-600"
                >
                    Delete
                </button>
            </div>
        </article>
    );
}
