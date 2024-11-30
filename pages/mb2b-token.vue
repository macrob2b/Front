<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="mb-2">
        <h1>MB2B Token</h1>
      </v-col>
      <v-col cols="12">
        <v-btn
          href="https://jup.ag/swap/USDC-BdLaNH3m6da2jXkx6XpGwLkUEKB4EbQWxLxntv5BuvAn"
          target="_blank"
          class="mb-8 primary"
          >Buy Token Now</v-btn
        >
        <v-btn href="#whitepaper" class="mb-8 ml-2">Whitepaper</v-btn>
      </v-col>
    </v-row>
    <iframe
      height="800px"
      width="100%"
      class="mx-auto"
      id="geckoterminal-embed"
      title="GeckoTerminal Embed"
      src="https://www.geckoterminal.com/solana/pools/6iFXKWTP7S4FRhKrK8oLtTVQivppyfuqX3eFwp5y7Wk2?embed=1&info=0&swaps=1"
      frameborder="0"
      allow="clipboard-write"
      allowfullscreen
    ></iframe>

    <v-row>
      <v-col cols="12" class="mt-10">
        <h2 id="whitepaper">MB2B Token Whitepaper</h2>
        <p>
          <strong>Abstract</strong><br />A brief overview of the MB2B token,
          highlighting its purpose, utility, and governance-driven minting
          model.
        </p>
        <hr class="my-4" />
        <h3><strong>1. Introduction</strong></h3>
        <ul>
          <li>
            <strong>Purpose of MB2B Token</strong>: Funding the MacroB2B
            platform, empowering users to have a stake in the project, and
            enabling governance.
          </li>
          <li>
            <strong>Vision</strong>: Democratizing B2B governance and funding
            through blockchain technology.
          </li>
        </ul>
        <hr class="my-4" />
        <h3><strong>2. Tokenomics</strong></h3>
        <ul>
          <li><strong>Initial Supply</strong>: 720 tokens.</li>
          <li>
            <strong>Mint Authority</strong>: Governed by MB2B governance tokens.
          </li>
          <li>
            <strong>Minting Process</strong>: Proposals from teams are voted on,
            and minting occurs based on collective approval.
          </li>
          <li>
            <strong>Use Cases</strong>:
            <ul>
              <li>
                <strong>Funding Projects</strong>: Allocate resources based on
                governance decisions.
              </li>
              <li>
                <strong>Stakeholder Representation</strong>: Token holders
                influence decisions via voting.
              </li>
              <li>
                <strong>Governance</strong>: Proposals and votes shape the
                future of the MacroB2B ecosystem.
              </li>
            </ul>
          </li>
        </ul>
        <hr class="my-4" />
        <h3><strong>3. Governance Model</strong></h3>
        <ul>
          <li>
            <strong>Proposal Submission</strong>: Teams submit project proposals
            for review.
          </li>
          <li>
            <strong>Voting Mechanism</strong>:
            <ul>
              <li>Each governance token equals one vote.</li>
              <li>Voting periods and thresholds are predefined.</li>
            </ul>
          </li>
          <li>
            <strong>Transparency</strong>: On-chain records for proposals,
            votes, and token minting.
          </li>
        </ul>
        <hr class="my-4" />
        <h3><strong>4. Technical Details</strong></h3>
        <ul>
          <li><strong>Blockchain Platform</strong>: Solana</li>
          <li>
            <strong>Smart Contracts</strong>: Secure and auditable mechanisms
            for minting and governance.
          </li>
          <li>
            <strong>Wallets Supported</strong>: Compatible with popular Solana
            wallets.
          </li>
        </ul>
        <hr class="my-4" />
        <h3><strong>5. Use Cases and Roadmap</strong></h3>
        <ul>
          <li>
            <strong>Phase 1</strong>: Launch MB2B token and governance system.
          </li>
          <li>
            <strong>Phase 2</strong>: Integrate token functionality into
            MacroB2B.com.
          </li>
          <li>
            <strong>Phase 3</strong>: Expand ecosystem partnerships and use
            cases.
          </li>
          <li>
            <strong>Phase 4</strong>: Implement advanced DAO tools for B2B
            governance.
          </li>
        </ul>
        <hr class="my-4" />
        <h3><strong>6. Security and Compliance</strong></h3>
        <ul>
          <li>
            <strong>Smart Contract Audits</strong>: Ensuring the security of
            governance and minting processes.
          </li>
          <li>
            <strong>Regulatory Compliance</strong>: Adhering to local and
            international standards for token issuance and governance.
          </li>
        </ul>
        <hr class="my-4" />
        <h3><strong>7. Community and Ecosystem</strong></h3>
        <ul>
          <li>
            <strong>Community Engagement</strong>: Involve token holders in
            strategic decisions.
          </li>
          <li>
            <strong>Partnerships</strong>: Collaborate with B2B projects to
            expand token utility.
          </li>
          <li>
            <strong>Incentives</strong>: Reward participation in governance and
            token staking.
          </li>
        </ul>
        <hr class="my-4" />
        <h3><strong>8. Conclusion</strong></h3>
        <p>
          A call to action for stakeholders and businesses to join the MacroB2B
          ecosystem and shape its future.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  auth: false,
  name: "mb2b-token",
  head() {
    return {
      title: "Mb2b Token",
    };
  },

  data() {
    return {};
  },
};
</script>

<style scoped>
video {
  border-radius: 5px;
  margin-top: 20px;
  width: 100%;
  height: auto;
}
</style>
