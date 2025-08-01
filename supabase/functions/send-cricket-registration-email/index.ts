import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  teamData: {
    teamName: string;
    captainName: string;
    captainPhone: string;
    captainEmail: string;
    players: Array<{ name: string; age: string; phone?: string }>;
  };
  paymentStatus: string;
  registrationId: string;
  paymentAmount?: number;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { teamData, paymentStatus, registrationId, paymentAmount }: EmailRequest = await req.json();

    // Initialize SMTP client with Hostinger settings
    const client = new SMTPClient({
      connection: {
        hostname: "smtp.hostinger.com",
        port: 465,
        tls: true,
        auth: {
          username: Deno.env.get("SMTP_USERNAME") || "",
          password: Deno.env.get("SMTP_PASSWORD") || "",
        },
      },
    });

    const playersList = teamData.players
      .map((player, index) => `${index + 1}. ${player.name} (Age: ${player.age})`)
      .join('\n');

    // Email content for user
    const userEmailContent = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #4CAF50, #2196F3); color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .details { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; }
        .status { padding: 10px; margin: 10px 0; border-radius: 5px; text-align: center; font-weight: bold; }
        .success { background: #d4edda; color: #155724; }
        .pending { background: #fff3cd; color: #856404; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🏏 Cricket Tournament Registration</h1>
            <h2>Western Ghats X</h2>
        </div>
        
        <div class="content">
            <h3>Dear ${teamData.captainName},</h3>
            <p>Thank you for registering your team for the Saravanampatti Blasters League!</p>
            
            <div class="details">
                <h4>Team Details:</h4>
                <p><strong>Team Name:</strong> ${teamData.teamName}</p>
                <p><strong>Captain:</strong> ${teamData.captainName}</p>
                <p><strong>Phone:</strong> ${teamData.captainPhone}</p>
                <p><strong>Email:</strong> ${teamData.captainEmail}</p>
                <p><strong>Registration ID:</strong> ${registrationId}</p>
            </div>
            
            <div class="details">
                <h4>Players (${teamData.players.length}):</h4>
                <pre>${playersList}</pre>
            </div>
            
            <div class="status ${paymentStatus === 'completed' ? 'success' : 'pending'}">
                Payment Status: ${paymentStatus.toUpperCase()}
                ${paymentAmount ? `\nAmount: ₹${paymentAmount.toLocaleString()}` : ''}
            </div>
            
            <p>We will contact you soon with further details about the tournament schedule and venue.</p>
            
            <p>Best regards,<br>
            Western Ghats X Team<br>
            Email: events@westernghatsx.in</p>
        </div>
    </div>
</body>
</html>`;

    // Email content for admin
    const adminEmailContent = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #333; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .details { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New Team Registration - Admin Notification</h1>
        </div>
        
        <div class="content">
            <h3>New team registration received!</h3>
            
            <div class="details">
                <h4>Team Information:</h4>
                <p><strong>Team Name:</strong> ${teamData.teamName}</p>
                <p><strong>Captain:</strong> ${teamData.captainName}</p>
                <p><strong>Phone:</strong> ${teamData.captainPhone}</p>
                <p><strong>Email:</strong> ${teamData.captainEmail}</p>
                <p><strong>Registration ID:</strong> ${registrationId}</p>
                <p><strong>Payment Status:</strong> ${paymentStatus}</p>
                ${paymentAmount ? `<p><strong>Payment Amount:</strong> ₹${paymentAmount.toLocaleString()}</p>` : ''}
            </div>
            
            <div class="details">
                <h4>Players (${teamData.players.length}):</h4>
                <pre>${playersList}</pre>
            </div>
            
            <p>Please review and follow up as necessary.</p>
        </div>
    </div>
</body>
</html>`;

    // Send email to user
    await client.send({
      from: "Western Ghats X <events@westernghatsx.in>",
      to: teamData.captainEmail,
      subject: `Cricket Tournament Registration Confirmation - ${teamData.teamName}`,
      content: userEmailContent,
      html: userEmailContent,
    });

    // Send email to admin
    await client.send({
      from: "Western Ghats X <events@westernghatsx.in>",
      to: "events@westernghatsx.in",
      subject: `New Team Registration: ${teamData.teamName}`,
      content: adminEmailContent,
      html: adminEmailContent,
    });

    await client.close();

    console.log("Registration emails sent successfully");

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Registration emails sent successfully" 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-cricket-registration-email function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);