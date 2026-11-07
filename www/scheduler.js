// HERHALINGSALGORITME — pas alleen dit bestand aan om het gedrag te wijzigen.
// Een "item" is één woord in één richting. Alles werkt op de globale antwoordteller, niet op tijd.
const Scheduler = {
  // afstand (aantal andere antwoorden) per reeks goede antwoorden: index = reeks
  INTERVALS: [3, 10, 25, 60, 150, 350, 500, 1000, 2000, 3000],
  MASTER_AT: 10, // zoveel goed op rij = deze richting is beheerst

  fresh() { return { streak: 0, target: 0, right: 0, wrong: 0, last: 0, due: 0, mastered: false }; },

  // beoordeel een antwoord; counter = teller NA ophogen
  grade(p, ok, counter) {
    if (ok) {
      p.right++;
      // na een fout: stappen van 2 tot het oude niveau (target) weer is bereikt
      p.streak = p.streak < p.target ? Math.min(p.streak + 2, p.target) : p.streak + 1;
      if (p.streak > p.target) p.target = p.streak;
    } else {
      p.wrong++;
      p.target = Math.max(p.target, p.streak); // oude niveau onthouden
      p.streak = 0;
    }
    p.mastered = p.streak >= this.MASTER_AT;
    p.last = counter;
    p.due = counter + this.INTERVALS[Math.min(p.streak, this.INTERVALS.length - 1)];
    return p;
  }
};
