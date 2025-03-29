
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EducationCard from "@/components/EducationCard";

const Education = () => {
  // Array of educational content cards
  const educationItems = [
    {
      title: "Bot Accounts",
      description: "Bot accounts are automated or semi-automated profiles that perform tasks like following, liking, or commenting without human intervention.",
      signs: [
        "Abnormally high activity levels (hundreds of posts per day)",
        "Generic profile information with default images",
        "Content consists mostly of reposts or generic comments",
        "Follows thousands but has few followers",
        "Account creation date is very recent"
      ],
      tips: [
        "Check posting patterns - consistent posting at exact time intervals",
        "Review comment content for generic, non-contextual phrases",
        "Investigate follower-to-following ratio",
        "Use reverse image search on profile pictures"
      ]
    },
    {
      title: "Impersonation Accounts",
      description: "Impersonation accounts mimic real people or organizations, attempting to deceive followers to gain trust, information, or money.",
      signs: [
        "Slight variations in username (extra characters, underscores)",
        "Recent account creation date compared to the real account",
        "Limited engagement with followers",
        "Poor quality content compared to the authentic account",
        "Suspicious links in bio or messages"
      ],
      tips: [
        "Check for verified account badges if available",
        "Compare to known official accounts",
        "Look for contact information inconsistencies",
        "Be wary of accounts that pressure you to click links or provide information"
      ]
    },
    {
      title: "Scammer Profiles",
      description: "Scammer profiles are created specifically to execute scams, often presenting too-good-to-be-true opportunities or creating false emergencies.",
      signs: [
        "Overly attractive profile pictures that seem professionally photographed",
        "Bio mentions wealth, investment opportunities, or cryptocurrency",
        "Immediate attempts to move conversations to private messaging",
        "Displays of luxury lifestyle without substantive content",
        "Grammatical errors or unusual language patterns"
      ],
      tips: [
        "Never send money to people you've only met online",
        "Be skeptical of investment opportunities with guaranteed returns",
        "Research profiles thoroughly before engaging",
        "Trust your instincts - if something feels off, it probably is"
      ]
    },
    {
      title: "Sockpuppet Accounts",
      description: "Sockpuppet accounts are secondary profiles created to support the creator's main account, often used to create false consensus or harassment.",
      signs: [
        "Similar writing styles across supposedly different accounts",
        "Created around the same time or during a specific conflict",
        "Primarily engage with a specific topic or person",
        "Limited profile development or history",
        "Defends or supports the same accounts consistently"
      ],
      tips: [
        "Look for patterns in language and posting schedules",
        "Notice accounts that only appear in specific conversations",
        "Be wary of sudden appearance of multiple supportive accounts",
        "Check account creation dates during heated discussions"
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container px-4 py-8">
        <section className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Educational Resources</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Learn to identify different types of inauthentic accounts and protect yourself online
          </p>
          
          {educationItems.map((item, index) => (
            <EducationCard
              key={index}
              title={item.title}
              description={item.description}
              signs={item.signs}
              tips={item.tips}
            />
          ))}

          <div className="bg-muted/30 p-6 rounded-lg border mt-8">
            <h2 className="text-xl font-semibold mb-3">General Safety Tips</h2>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Use strong, unique passwords for each social media account</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Enable two-factor authentication whenever possible</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Regularly review your privacy settings on all platforms</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Be cautious about the personal information you share online</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Report suspicious accounts to the platform immediately</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Think critically about content before sharing or engaging with it</span>
              </li>
            </ul>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Education;
